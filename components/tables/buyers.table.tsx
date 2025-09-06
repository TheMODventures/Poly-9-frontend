"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import { FaFacebook } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { Checkbox } from "../ui/checkbox"
import { buyersData } from "@/data/mock-data"
import EditModalForm from "@/components/forms/buyers/edit-modal/edit.form"
import DeleteModal from "@/components/helper/buyers-delete-button"
import { Buyer } from "@/interfaces/interface"
import BuyerActionsMenu from "../helper/buyer-actions-menu"

export default function BuyersTable() {
  const [selected, setSelected] = useState<(string | number)[]>([])

  const toggleSelect = (id: string | number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <div className="max-h-[380px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scroll-smooth">
        <Table className="relative w-full border-collapse">
          <TableHeader className="sticky top-0 z-10 bg-blue-500">
            <TableRow>
              <TableHead className="text-white font-medium">Company Name</TableHead>
              <TableHead className="text-white font-medium">Context</TableHead>
              <TableHead className="text-white font-medium">Websites</TableHead>
              <TableHead className="text-white font-medium">Type</TableHead>
              <TableHead className="text-white font-medium">Socials</TableHead>
              <TableHead className="text-white font-medium space-x-4 w-4 translate-x-8">
                Action
              </TableHead>
              <TableHead className="text-white font-medium"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buyersData.map((buyer: Buyer) => (
              <TableRow key={buyer.id} className="border-b hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {buyer.logo}
                    </div>
                    <span className="font-medium text-gray-900">{buyer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900 font-medium">{buyer.context}</TableCell>
                <TableCell className="text-gray-900 font-medium">{buyer.website}</TableCell>
                <TableCell><span className="text-gray-600">{buyer.type}</span></TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <FaFacebook className="w-5 h-5 text-gray-600" />
                    <IoLogoInstagram className="w-5 h-5 text-gray-600" />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-0">
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Button>
                    <EditModalForm trigger={
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </Button>}
                      buyerData={buyer}
                    />
                    <DeleteModal trigger={
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>}
                      buyerName={buyer.name}
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="-translate-y-1">
                    <BuyerActionsMenu buyer={buyer} />
                    <Checkbox
                      checked={selected.includes(buyer.id)}
                      onCheckedChange={() => toggleSelect(buyer.id)}
                    />  
                  </div>
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}