import React from "react"
import { Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogTrigger,DialogClose,} from "@/components/ui/dialog"

interface DeleteModalProps {
  trigger: React.ReactNode
  buyerName?: string
}

export default function DeleteModal({ trigger, buyerName }: DeleteModalProps) {
  
  const handleDelete = async () => {
    try {
      console.log("Deleting buyer:", buyerName)
      
    } catch (error) {
      console.error("Error deleting buyer:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <Clipboard className="w-4 h-4 text-gray-600" />
            </div>
            Buyer Information
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <h3 className="text-lg font-medium text-gray-900 text-center">
            Are you sure you want to delete this entry?
          </h3>
        </div>

        <div className="flex gap-3 justify-end">
          <DialogClose asChild>
            <Button
              variant="secondary"
              className="px-6 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded-md font-medium"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md font-medium"
            >
              Delete
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}