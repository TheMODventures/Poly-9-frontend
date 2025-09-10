"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopCustomers from "./top-customers"
import Bestsellers from "./bestsellers"
import SearchFilterBar from "@/components/helper/search-filter-bar"
import CreateProduct from "../forms/create-product/create.form"

export default function TabsSection() {
  return (
    <Tabs defaultValue="collections" className="w-full">
      <div className="bg-white rounded-md shadow-sm p-4">
        <TabsList className="grid w-fit grid-cols-2 bg-white -translate-x-3">
          <TabsTrigger value="collections" className="data-[state=active]:text-gray-800 text-gray-600 data-[state=active]:font-extrabold text-xl font-inter">
            Collections
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:text-gray-800 text-gray-600 data-[state=active]:font-extrabold text-xl font-inter">
            Products Concepts
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="collections" className="space-y-5 mt-4 bg-white">
        <div className="flex items-center justify-between p-3 mt-3 ml-4 mr-4">
          <h2 className="text-2xl font-inter" style={{fontWeight:"700"}}>Collections</h2>
          <CreateProduct trigger={
            <button className="bg-blue-500 text-white px-4 py-2 cursor-pointer rounded-lg text-sm font-medium hover:bg-blue-600">
              + Add Collection
            </button>
          }/>
        </div>
        <div className="p-0 mr-6 ml-6"><SearchFilterBar /></div>
        <div className="bg-gradient-to-bl from-white via-purple-50 to-blue-50">
          <TopCustomers type="collections"/>
          <Bestsellers type="collections" />
        </div>
      </TabsContent>

      <TabsContent value="products" className="space-y-5 mt-4 bg-white">
        <div className="flex items-center justify-between p-3 mt-3 ml-4 mr-4">
          <h2 className="text-2xl font-inter" style={{fontWeight:"700"}}>Products</h2>
          <CreateProduct trigger={
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600">
            + Add Product
          </button>}/>
        </div>
        <div className="p-0 mr-6 ml-6"><SearchFilterBar /></div>
        <div className="bg-gradient-to-bl from-white via-purple-50 to-blue-50">
          {/* <TopCustomers  type="products" /> */}
          <Bestsellers type="products" />
        </div>
      </TabsContent>
    </Tabs>
  )
}
