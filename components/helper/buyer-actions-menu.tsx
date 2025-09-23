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
import { Buyer } from "@/interfaces/interface"

interface BuyerActionsMenuProps {
  buyer: Buyer
}

export default function BuyerActionsMenu({ }: BuyerActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="p-1 h-8 w-8"
          onClick={(event) => event.stopPropagation()}
        >
          <BsThreeDotsVertical className="w-4 h-4 text-gray-400 translate-y-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View Details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
