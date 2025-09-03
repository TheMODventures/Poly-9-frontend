"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { editBuyerSchema, EditBuyerFormValues } from "@/components/forms/buyers/edit-modal/edit.validation"
import { FaFacebook } from "react-icons/fa"
import { IoLogoInstagram } from "react-icons/io5"
import { Briefcase} from "lucide-react"

interface EditModalFormProps {
  trigger: React.ReactNode
  buyerData: {
    id: number
    name: string
    context: string
    website: string
    type: string
  }
}

export default function EditModalForm({
  trigger,
  buyerData
}: EditModalFormProps) {
  const form = useForm<EditBuyerFormValues>({
    resolver: yupResolver(editBuyerSchema),
    defaultValues: {
      companyName: buyerData.name,
      context: buyerData.context,
      website: buyerData.website,
      type: buyerData.type,
      hasFacebook: true,
      hasInstagram: true,
    },
  })

  const onSubmit = async (values: EditBuyerFormValues) => {
    try {
      console.log("Saving buyer data:", values)
    } catch (error) {
      console.error("Error updating buyer:", error)
    }
  }

  const { control, handleSubmit } = form

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <Briefcase className="w-5 h-5" />
              Buyer Information
            </DialogTitle>
            <DialogClose asChild>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="px-6 py-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Company Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="NovaWave LLC"
                          className="bg-gray-50 border-gray-200 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="context"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Context
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="5 files"
                          className="bg-gray-50 border-gray-200 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Websites
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Novwave.com"
                          className="bg-gray-50 border-gray-200 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Type
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Retailer"
                          className="bg-gray-50 border-gray-200 focus:bg-white"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                  Socials
                </FormLabel>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaFacebook className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <IoLogoInstagram className="w-6 h-6 text-pink-600" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 py-2 bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                  <Button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Save Changes
                  </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}