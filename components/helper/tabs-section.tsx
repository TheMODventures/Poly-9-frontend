"use client"

import { useMemo, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopCustomers from "./top-customers"
import Bestsellers from "./bestsellers"
import SearchFilterBar from "@/components/helper/search-filter-bar"
import CreateProduct from "../forms/create-product/create.form"
import { useBuyerItems } from "@/services/query"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { Skeleton } from "@/components/ui/skeleton"

type TabValue = "collections" | "products"

const tabToItemType: Record<TabValue, string> = {
  collections: "collection",
  products: "product",
}

interface TabsSectionProps {
  buyerId: string
}

export default function TabsSection({ buyerId }: TabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabValue>("collections")

  const queryParams = useMemo(
    () => ({
      buyer_id: buyerId,
      type: tabToItemType[activeTab],
      limit: 10,
    }),
    [activeTab, buyerId]
  )

  const { data, isLoading, isError, error, refetch } = useBuyerItems(queryParams)
  const items = data?.items ?? []

  const renderItems = () => {
    if (isLoading) {
      return <ItemsSkeleton />
    }

    if (isError) {
      return (
        <ErrorState
          title="Failed to load items"
          message={
            error?.message ||
            "Something went wrong while fetching buyer items."
          }
          onRetry={refetch}
          className="min-h-[260px]"
        />
      )
    }

    if (items.length === 0) {
      return (
        <EmptyState
          title="No items found"
          message="This buyer does not have any items for the selected category yet."
          className="min-h-[260px]"
        />
      )
    }

    return (
      <div className="bg-gradient-to-bl from-white via-purple-50 to-blue-50">
        <TopCustomers items={items.slice(0, 8)} />
        <Bestsellers items={items} />
      </div>
    )
  }

  const renderTabPanel = (tab: TabValue) => {
    const heading = tab === "collections" ? "Collections" : "Products"
    const actionLabel = tab === "collections" ? "+ Add Collection" : "+ Add Product"

    return (
      <div className="space-y-5 mt-4 bg-white">
        <div className="flex items-center justify-between p-3 mt-3 ml-4 mr-4">
          <h2 className="text-2xl font-inter" style={{ fontWeight: "700" }}>
            {heading}
          </h2>
          <CreateProduct
            trigger={
              <button className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-lg text-sm font-medium hover:bg-blue-600">
                {actionLabel}
              </button>
            }
          />
        </div>
        <div className="p-0 mr-6 ml-6">
          <SearchFilterBar />
        </div>
        {activeTab === tab ? renderItems() : null}
      </div>
    )
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabValue)}
      className="w-full"
    >
      <div className="bg-white rounded-md shadow-sm p-4">
        <TabsList className="grid w-fit grid-cols-2 bg-white -translate-x-3">
          <TabsTrigger
            value="collections"
            className="data-[state=active]:text-gray-800 text-gray-600 data-[state=active]:font-extrabold text-xl font-inter"
          >
            Collections
          </TabsTrigger>
          <TabsTrigger
            value="products"
            className="data-[state=active]:text-gray-800 text-gray-600 data-[state=active]:font-extrabold text-xl font-inter"
          >
            Products Concepts
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="collections">{renderTabPanel("collections")}</TabsContent>
      <TabsContent value="products">{renderTabPanel("products")}</TabsContent>
    </Tabs>
  )
}

function ItemsSkeleton() {
  return (
    <div className="bg-gradient-to-bl from-white via-purple-50 to-blue-50">
      <div className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-52 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  )
}
