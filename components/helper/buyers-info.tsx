"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { BsThreeDots } from "react-icons/bs"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import AddBuyerModal from "@/components/forms/buyers/add-modal/add.form"
import SearchFilterBar from "@/components/helper/search-filter-bar"

export default function BuyersInfo() {
  const pathname = usePathname()

  return (
    <div className="w-full space-y-4 p-8 bg-white rounded-xs mb-4 relative">
      {pathname !== "/context-file" && (
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full -translate-y-4">
                <BsThreeDots className="w-8 h-8 text-gray-700" />
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

      <div className="flex items-center justify-between scale-99">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-inter text-gray-900 font-bold">
            Buyer Directory
          </h1>
          <span className="flex items-center justify-center mt-1 bg-blue-500 border border-black text-white text-xs font-inter w-6 h-6 rounded-full">
            53
          </span>
        </div>
        <AddBuyerModal
          trigger={
            <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white font-bold py-2 px-2 rounded-sm flex items-center gap-2 transition-colors">
              <svg
                className="w-6 h-6 bg-white rounded-lg"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2F80ED"
                  d="M22 14H26V22H34V26H26V34H22V26H14V22H22V14Z"
                />
              </svg>
              Add Buyer
            </button>}
        />
      </div>

      <SearchFilterBar />
    </div>
  )
}
