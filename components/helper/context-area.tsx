import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FileItem from './file-item'

export default function ContextArea() {
  return (
    <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 border-l shadow-2xl shadow-blue-100 border-gray-200 flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-inter text-gray-800 mb-6">Product Categories</h2>
        
        <Tabs defaultValue="top-selling" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="top-selling" className="text-sm">Top selling</TabsTrigger>
            <TabsTrigger value="revenue" className="text-sm">Revenue</TabsTrigger>
            <TabsTrigger value="latest-news" className="text-sm">Latest News</TabsTrigger>
          </TabsList>
          
          <TabsContent value="top-selling" className="space-y-3">
            <FileItem />
            <FileItem />
            <FileItem />
          </TabsContent>
          
          <TabsContent value="revenue" className="space-y-3">
            <FileItem />
            <FileItem />
          </TabsContent>
          
          <TabsContent value="latest-news" className="space-y-3">
            <FileItem />
            <FileItem />
            <FileItem />
            <FileItem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}