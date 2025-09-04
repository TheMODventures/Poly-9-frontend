"use client"

import React, { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createProductSchema, CreateProductFormValues } from "./create.validation"
import { createStyleHandlers, getFormContent, isCollectionTrigger } from "@/utils/helper"

interface CreateProductProps {
  trigger: React.ReactNode
}

export default function CreateProduct({ trigger }: CreateProductProps) {
  const [newStyle, setNewStyle] = useState("")
  const isCollection = useMemo(() => isCollectionTrigger(trigger), [trigger])
  const content = useMemo(() => getFormContent(isCollection), [isCollection])

  const form = useForm<CreateProductFormValues>({
    resolver: yupResolver(createProductSchema),
    defaultValues: {
      collectionName: "",
      season: "",
      styles: ["Modern", "Minimalistic"],
      productCount: "",
    },
  })

  const { control, handleSubmit, watch, setValue, reset } = form
  const watchedStyles = watch("styles")

  const { addStyle, removeStyle } = createStyleHandlers(watchedStyles, setValue, setNewStyle)

  const onSubmit = async (values: CreateProductFormValues) => {
    try {
      console.log(`Creating ${isCollection ? 'collection' : 'product'}:`, values)
      reset()
    } catch (error) {
      console.error(`Error creating ${isCollection ? 'collection' : 'product'}:`, error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0 gap-0 scale-78">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {content.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mx-6 mb-6 p-4 bg-blue-500 text-white rounded-lg">
          <p className="text-sm">
            {content.subtitle}
          </p>
        </div>

        <div className="px-6 pb-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="collectionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.nameLabel}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        className="bg-gray-50 border-gray-200 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="season"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.seasonLabel}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lorem ipsum dolor sit amet consectetur"
                        className="bg-gray-50 border-gray-200 focus:bg-white min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="styles"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.styleLabel}
                    </FormLabel>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {watchedStyles.map((style) => (
                        <Badge
                          key={style}
                          variant="secondary"
                          className={`px-3 py-1 text-sm ${style === "Modern" ? "bg-blue-100 text-blue-700" :
                              style === "Minimalistic" ? "bg-cyan-100 text-cyan-700" :
                                "bg-gray-100 text-gray-700"
                            }`}
                        >
                          {style}
                          <X
                            className="w-3 h-3 ml-1 cursor-pointer"
                            onClick={() => removeStyle(style)}
                          />
                        </Badge>
                      ))}

                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Add tag"
                          className="text-sm px-2 py-1 border border-gray-300 rounded-md text-gray-600"
                          value={newStyle}
                          onChange={(e) => setNewStyle(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addStyle(newStyle)
                            }
                          }}
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="productCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium text-gray-900">
                      {content.countLabel}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Lorem ipsum dolor sit amet consectetur"
                        className="bg-gray-50 border-gray-200 focus:bg-white min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}