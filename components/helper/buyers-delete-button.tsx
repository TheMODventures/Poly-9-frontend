import React, { useState } from "react"
import { PiBagBold } from "react-icons/pi";
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,DialogClose,} from "@/components/ui/dialog"
import { useDeleteBuyer, useListBuyers } from "@/services/mutation/buyer.mutation"
import { Buyer } from "@/interfaces/interface"

interface DeleteModalProps {
  trigger: React.ReactNode
  buyerData: Buyer
}

export default function DeleteModal({ trigger, buyerData }: DeleteModalProps) {
  const deleteBuyerMutation = useDeleteBuyer()
  const listBuyersMutation = useListBuyers()
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleDelete = async () => {
    deleteBuyerMutation.mutate(
      { buyer_id: buyerData.buyer_id },
      {
        onSuccess: () => {
          // Close modal
          setIsModalOpen(false)
          
          // Refresh buyers list
          listBuyersMutation.mutate({ page: 1, limit: 10 })
        }
      }
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-inter">
            <div className="w-10 h-10 rounded-lg border flex items-center justify-center">
              <PiBagBold className="w-6 h-6 text-gray-600" />
            </div>
            Delete Buyer
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className="py-6">
          <h3 className="text-lg font-medium text-gray-900 text-center">
            Are you sure you want to delete <strong>{buyerData.company}</strong>?
          </h3>
          <p className="text-sm text-gray-500 text-center mt-2">
            This action cannot be undone.
          </p>
        </div>
        <hr />
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 bg-gray-400 text-white hover:bg-gray-400 rounded-md font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={deleteBuyerMutation.isPending}
            className="px-6 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {deleteBuyerMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}