"use client";

import { Button } from "../ui/button";
import { IoFilter } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SearchForm } from "../forms/search/search.form";

export default function SearchFilterBar() {
  return (
    <div className="flex items-center justify-between gap-0">
      <SearchForm />

      <div className="flex">
        <Button
          variant="outline"
          className="flex items-center border-gray-300 text-gray-700 rounded-r-none rounded-l-md px-4 h-9">
          <IoFilter className="w-4 h-4 mr-2" />
          Filter
        </Button>

        <Select defaultValue="latest">
          <SelectTrigger
            className="w-40 h-10 border-gray-300 text-gray-700
                       rounded-l-none rounded-r-md focus:ring-0 focus:outline-none"
          >
            <SelectValue placeholder="Order By Latest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Order By Latest</SelectItem>
            <SelectItem value="oldest">Order By Oldest</SelectItem>
            <SelectItem value="name">Order By Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
