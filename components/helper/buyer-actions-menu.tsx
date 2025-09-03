"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsThreeDotsVertical } from "react-icons/bs"
import EditModalForm from "@/components/forms/buyers/edit-modal/edit.form"
import DeleteModal from "@/components/helper/buyers-delete-button"
import { Buyer } from "@/interfaces/interface"

interface BuyerActionsMenuProps {
  buyer: Buyer
}

export default function BuyerActionsMenu({ buyer }: BuyerActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
          <BsThreeDotsVertical className="w-4 h-4 text-gray-400 translate-y-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View Details</DropdownMenuItem>
        <EditModalForm
        trigger={
            <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => e.preventDefault()} 
            >
            Edit
            </DropdownMenuItem>
        }
        buyerData={buyer}/>

        <DeleteModal
        trigger={
            <DropdownMenuItem
            className="text-red-600 cursor-pointer"
            onSelect={(e) => e.preventDefault()}
            >
            Delete
            </DropdownMenuItem>
        }
        buyerName={buyer.name}/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}