"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from 'lucide-react'
import { MdAddBox } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import AddBuyerModal from "@/components/forms/buyers/add-modal/add.form"
import { SearchForm } from '../forms/search/search.form'

export default function BuyersInfo() {
  return (
    <div className="w-full space-y-4 p-8 bg-white rounded-lg mb-4 relative">
        <div className="absolute top-4 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <BsThreeDots className="w-5 h-5 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
                <Link href="/chat">Chat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/context-file">Context Files</Link>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center justify-between scale-94">
        <h1 className="text-2xl font-semibold text-gray-900">Buyer Directory</h1>
        <AddBuyerModal
          trigger={
            <Button className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2">
              <MdAddBox className="w-12 h-12 rounded-xl" />
              Add Buyer
            </Button>
          }
        />
      </div>
      
      <div className="flex items-center justify-between gap-4 scale-94">
        <SearchForm />
        
        <div className="flex items-center gap-1">
          <Button variant="outline" className="text-gray-600 border-gray-200">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          
          <Select defaultValue="latest">
            <SelectTrigger className="w-40 border-gray-200 focus:no-ring focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Order By Latest</SelectItem>
              <SelectItem value="oldest">Order By Oldest</SelectItem>
              <SelectItem value="name">Order By Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}