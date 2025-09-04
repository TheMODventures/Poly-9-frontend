import React from 'react'
import { FileText } from 'lucide-react'

export default function FileItem() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="w-8 h-8 bg-blue-400 rounded-md flex items-center justify-center">
        <FileText className="w-4 h-4 text-white" />
      </div>
      <span className="text-gray-700 font-medium">Context File</span>
    </div>
  )
}