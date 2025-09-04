"use client"

import React from "react"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Resolver } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { addBuyerSchema, AddBuyerFormValues } from "@/components/forms/buyers/add-modal/add.validation"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { typeOptions } from "@/data/mock-data"
import { toggleSocial } from "@/utils/helper"
import { UploadFile } from "@/components/shared/upload"

interface AddBuyerModalProps {
  trigger: React.ReactNode
}

export default function AddBuyerModal({ trigger }: AddBuyerModalProps) {
  const form = useForm<AddBuyerFormValues>({
    resolver: yupResolver(addBuyerSchema) as Resolver<AddBuyerFormValues>,
  })

  const { control, handleSubmit, reset } = form

  const onSubmit = async (values: AddBuyerFormValues) => {
    try {
      console.log("Adding new buyer:", values)
      reset()
    } catch (error) {
      console.error("Error adding buyer:", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 gap-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <DialogTitle className="text-lg font-medium text-blue-500">
            Add New Buyer
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4 max-h-[calc(90vh-120px)]">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Buyer Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Shahzad Asam"
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Example@gmail.com"
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="socials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                      Socials
                    </FormLabel>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Select
                          onValueChange={(value) => {
                            if (!field.value?.includes(value)) {
                              field.onChange([...(field.value || []), value])
                            }
                          }}
                        >
                          <SelectTrigger className="w-32 bg-gray-50 border-gray-200 text-sm">
                            <SelectValue placeholder="Select Socials" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="facebook">Facebook</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            className={`p-2 h-8 w-8 rounded ${
                              field.value?.includes("facebook")
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            onClick={() => toggleSocial(field, "facebook")}
                          >
                            <FaFacebook className="w-4 h-4" />
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            className={`p-2 h-8 w-8 rounded ${
                              field.value?.includes("twitter")
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            onClick={() => toggleSocial(field, "twitter")}
                          >
                            <FaTwitter className="w-4 h-4" />
                          </Button>

                          <Button
                            type="button"
                            size="sm"
                            className={`p-2 h-8 w-8 rounded ${
                              field.value?.includes("instagram")
                                ? "bg-pink-500 text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            onClick={() => toggleSocial(field, "instagram")}
                          >
                            <FaInstagram className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 border-gray-200">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div>
                <FormLabel className="text-sm font-medium text-gray-700 mb-2 block">
                  File <span className="text-xs text-gray-500">(Must be equal or less )</span>
                </FormLabel>
                <UploadFile />
              </div>

              <FormField
                control={control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Note
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Note lorem ipsum"
                        className="bg-gray-50 border-gray-200 focus:bg-white min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
                >
                  Submit
                </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}