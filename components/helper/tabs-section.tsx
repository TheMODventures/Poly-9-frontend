"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopCustomers from "./top-customers"
import Bestsellers from "./bestsellers"
import SearchFilterBar from "@/components/helper/search-filter-bar"
import CreateProduct from "../forms/create-product/create.form"

export default function TabsSection() {
  return (
    <Tabs defaultValue="collections" className="w-full">
      <div className="bg-white rounded-md shadow-sm p-2">
        <TabsList className="grid w-fit grid-cols-2 bg-white">
          <TabsTrigger value="collections" className="data-[state=active]:text-black data-[state=active]:font-extrabold">
            Collections
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:text-black data-[state=active]:font-extrabold">
            Products Concepts
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="collections" className="space-y-8 mt-4 bg-white">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-xl font-semibold">Collections</h2>
      <CreateProduct trigger={
        <button className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-lg text-sm font-medium hover:bg-blue-600">
          + Add Collection  {/* Contains "collection" - will show collection UI */}
        </button>
      }/>
        </div>
        <div className="p-2"><SearchFilterBar /></div>
        <TopCustomers type="collections"/>
        <Bestsellers type="collections" />
      </TabsContent>

      <TabsContent value="products" className="space-y-8 mt-6  bg-white">
        <div className="flex items-center justify-between p-3">
          <h2 className="text-xl font-semibold">Products</h2>
          <CreateProduct trigger={
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
            + Add Product
          </button>}/>
        </div>
        <div className="p-2"><SearchFilterBar /></div>
        <TopCustomers  type="products" />
        <Bestsellers type="products" />
      </TabsContent>
    </Tabs>
  )
}
