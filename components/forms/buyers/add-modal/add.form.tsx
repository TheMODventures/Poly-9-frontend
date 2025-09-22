"use client"

import React, { useState } from "react"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Resolver } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { addBuyerSchema, AddBuyerFormValues } from "@/components/forms/buyers/add-modal/add.validation"
import { typeOptions } from "@/data/mock-data"
import { UploadFile } from "@/components/shared/upload"
import { X } from "lucide-react"
import { useCreateBuyer, useListBuyers } from "@/services/mutation/buyer.mutation"
import { FileUploadResponse } from "@/interfaces/interface"
import { SOCIAL_OPTIONS } from "@/utils/social.constants"
import SocialLinkModal from "@/components/dialogs/social-link-modal"

interface AddBuyerModalProps {
  trigger: React.ReactNode
}


export default function AddBuyerModal({ trigger }: AddBuyerModalProps) {
  const createBuyerMutation = useCreateBuyer()
  const listBuyersMutation = useListBuyers()
  
  const form = useForm<AddBuyerFormValues>({
    resolver: yupResolver(addBuyerSchema) as Resolver<AddBuyerFormValues>,
    defaultValues: {
      companyName: "",
      website: "",
      socials: [],
      type: "",
      note: ""
    }
  })

  const { control, handleSubmit, reset, setValue, watch } = form
  const socials = watch("socials") || []
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Social management state
  const [selectedSocial, setSelectedSocial] = useState<string>("")
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false)
  const [editingSocial, setEditingSocial] = useState<{name: string, url: string} | null>(null)
  
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResponse[]>([])

  const handleAddSocial = (url: string) => {
    if (selectedSocial) {
      // Check if this social platform is already added
      const existingSocial = socials.find(s => s.name === selectedSocial)
      if (existingSocial) {
        // Update existing social instead of adding duplicate
        const updatedSocials = socials.map(s => 
          s.name === selectedSocial ? { ...s, url } : s
        )
        setValue("socials", updatedSocials)
      } else {
        // Add new social
        const newSocial = { name: selectedSocial, url }
        setValue("socials", [...socials, newSocial])
      }
      setSelectedSocial("")
    }
  }

  const handleEditSocial = (social: {name: string, url: string}) => {
    setEditingSocial(social)
    setIsSocialModalOpen(true)
  }

  const handleUpdateSocial = (url: string) => {
    if (editingSocial) {
      const updatedSocials = socials.map(s => 
        s.name === editingSocial.name && s.url === editingSocial.url 
          ? { ...s, url } 
          : s
      )
      setValue("socials", updatedSocials)
      setEditingSocial(null)
    }
  }

  const handleRemoveSocial = (socialToRemove: {name: string, url: string}) => {
    const updatedSocials = socials.filter(s => 
      !(s.name === socialToRemove.name && s.url === socialToRemove.url)
    )
    setValue("socials", updatedSocials)
  }

  // File upload handlers
  const handleFileUploaded = (fileData: FileUploadResponse) => {
    setUploadedFiles(prev => [...prev, fileData])
  }

  const handleFileRemoved = (fileToRemove: FileUploadResponse) => {
    setUploadedFiles(prev => prev.filter(file => file.file_id !== fileToRemove.file_id))
  }

  const onSubmit = async (values: AddBuyerFormValues) => {
    // Helper function to add protocol to URLs if missing
    const addProtocolToUrl = (url: string) => {
      if (!url) return url;
      return url.startsWith('http://') || url.startsWith('https://') 
        ? url 
        : `https://${url}`;
    };

    // Prepare the request body according to CreateBuyerPayload interface
    const createBuyerPayload = {
      company: values.companyName,
      website: values.website ? addProtocolToUrl(values.website) : undefined,
      socials: values.socials?.map(social => ({
        ...social,
        url: addProtocolToUrl(social.url)
      })) || [],
      type: values.type || undefined,
      note: values.note || undefined,
      files: uploadedFiles.map(file => file.url)
    }

    createBuyerMutation.mutate(createBuyerPayload, {
      onSuccess: () => {
        // Reset form
        reset({
          companyName: "",
          website: "",
          socials: [],
          type: "",
          note: ""
        })
        setUploadedFiles([])
        setSelectedSocial("")
        setEditingSocial(null)
        
        // Close modal
        setIsModalOpen(false)
        
        // Refresh buyers list by calling listAllBuyers
        listBuyersMutation.mutate({ page: 1, limit: 10 })
      }
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">
                      Socials
                    </FormLabel>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Select
                          value={selectedSocial}
                          onValueChange={setSelectedSocial}
                        >
                          <SelectTrigger className="w-40 bg-gray-50 border-gray-200 text-sm">
                            <SelectValue placeholder="Select Socials" />
                          </SelectTrigger>
                          <SelectContent>
                          {SOCIAL_OPTIONS
                            .filter(option => !socials.some(social => social.name === option.value))
                            .map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <option.icon className="w-4 h-4" />
                                    {option.label}
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>

                          <Button
                            type="button"
                            size="sm"
                          className="w-8 h-8 p-0 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                          disabled={!selectedSocial}
                          onClick={() => setIsSocialModalOpen(true)}
                        >
                          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14"/>
                          </svg>
                          </Button>
                      </div>

                      {/* Display added socials */}
                      {socials.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {socials.map((social, index) => {
                            const socialOption = SOCIAL_OPTIONS.find(s => s.value === social.name)
                            const IconComponent = socialOption?.icon || SOCIAL_OPTIONS[0].icon
                            return (
                              <div
                                key={`${social.name}-${index}`}
                                className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => handleEditSocial(social)}
                              >
                                <div className={`w-6 h-6 rounded-full ${socialOption?.color} flex items-center justify-center`}>
                                  <IconComponent className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-sm text-gray-700 truncate max-w-32">
                                  {social.url}
                                </span>
                                <button
                            type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveSocial(social)
                                  }}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                        </div>
                            )
                          })}
                      </div>
                      )}
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
                <UploadFile 
                  uploadedFiles={uploadedFiles}
                  onFileUploaded={handleFileUploaded}
                  onFileRemoved={handleFileRemoved}
                />
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
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={createBuyerMutation.isPending}
                >
                  {createBuyerMutation.isPending ? "Creating..." : "Submit"}
                </Button>
            </form>
          </Form>
        </div>
      </DialogContent>

      {/* Social Link Modal */}
      <SocialLinkModal
        isOpen={isSocialModalOpen}
        onClose={() => {
          setIsSocialModalOpen(false)
          setEditingSocial(null)
        }}
        onSave={editingSocial ? handleUpdateSocial : handleAddSocial}
        socialName={editingSocial?.name || selectedSocial}
        initialUrl={editingSocial?.url || ""}
        isEditing={!!editingSocial}
      />
    </Dialog>
  )
}