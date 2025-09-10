import React from 'react'
import { AiFillFolder } from "react-icons/ai";

export default function FileItem() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="w-8 h-8 bg-[#EAF5FF] rounded-md flex items-center justify-center">
        <AiFillFolder className="w-6 h-6 text-blue-300" />
      </div>
      <span className="text-gray-700 font-medium">Context File</span>
    </div>
  )
}