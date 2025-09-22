"use client"

import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"
import { FaFacebook } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { Checkbox } from "../ui/checkbox"
import EditBuyerModal from "@/components/forms/buyers/edit-modal/edit.form"
import DeleteModal from "@/components/helper/buyers-delete-button"
import { Buyer } from "@/interfaces/interface"
import BuyerActionsMenu from "../helper/buyer-actions-menu"
import { useListBuyers } from "@/services/query"
import { ErrorState } from "@/components/ui/error-state"
import { EmptyState } from "@/components/ui/empty-state"
import { TableSkeleton } from "@/components/ui/skeleton"

export default function BuyersTable() {
  const [selected, setSelected] = useState<(string | number)[]>([])
  const { data, isLoading, isError, error, refetch } = useListBuyers({ page: 1, limit: 10 })
  const buyers = data?.data || []

  if (isLoading) {
    return <TableSkeleton />
  }

  if (isError) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <ErrorState 
          title="Failed to load buyers"
          message={error?.message || "Something went wrong while loading the buyers list."}
          onRetry={refetch}
          className="h-64"
        />
      </div>
    )
  }

  if (!buyers || buyers.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg overflow-hidden">
        <EmptyState 
          title="No buyers found"
          message="You haven't added any buyers yet. Create your first buyer to get started."
          actionLabel="Add Buyer"
          className="h-64"
        />
      </div>
    )
  }

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
              <TableHead className="text-white font-medium translate-x-4">Company Name</TableHead>
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
            {buyers.map((buyer: Buyer) => (
              <TableRow key={buyer.buyer_id} className="border-b hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-3  translate-x-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                      {buyer.company.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">{buyer.company}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-900 font-medium">{buyer.files.length} files</TableCell>
                <TableCell className="text-gray-900 font-medium">{buyer.website || 'N/A'}</TableCell>
                <TableCell><span className="text-gray-600">{buyer.type || 'N/A'}</span></TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    {buyer.socials.map((social, index) => (
                      <div key={index} className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-xs">{social.name.charAt(0).toUpperCase()}</span>
                      </div>
                    ))}
                    {buyer.socials.length === 0 && <span className="text-gray-400 text-sm">No socials</span>}
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-0">
                    <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Button>
                    <EditBuyerModal trigger={
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </Button>}
                      buyerData={buyer}
                    />
                    <DeleteModal trigger={
                        <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>}
                      buyerData={buyer}
                    />
                  </div>
                </TableCell>

                <TableCell>
                  <div className="-translate-y-1">
                    <BuyerActionsMenu buyer={buyer} />
                    <Checkbox
                      checked={selected.includes(buyer.buyer_id)}
                      onCheckedChange={() => toggleSelect(buyer.buyer_id)}
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