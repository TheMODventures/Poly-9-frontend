"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { MdAddBox } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AddBuyerModal from "@/components/forms/buyers/add-modal/add.form"
import SearchFilterBar from "@/components/helper/search-filter-bar"

export default function BuyersInfo() {
  const pathname = usePathname()

  return (
    <div className="w-full space-y-4 p-8 bg-white rounded-lg mb-4 relative">
      {pathname !== "/context-file" && (
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
      )}

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

      <SearchFilterBar />
    </div>
  )
}
