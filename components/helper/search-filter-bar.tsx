"use client"

import { Button } from "../ui/button"
import { Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { SearchForm } from "../forms/search/search.form"

export default function SearchFilterBar() {
  return (
    <div className="flex items-center justify-between gap-4">
      <SearchForm />
      <div className="flex items-center gap-1">
        <Button variant="outline" className="text-gray-600 border-gray-200">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        <Select defaultValue="latest">
          <SelectTrigger className="w-40 border-gray-200 focus:no-ring focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Order By Latest</SelectItem>
            <SelectItem value="oldest">Order By Oldest</SelectItem>
            <SelectItem value="name">Order By Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
