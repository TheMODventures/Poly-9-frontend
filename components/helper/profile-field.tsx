"use client"

import { useState, useCallback } from "react"
import { Edit3 } from "lucide-react"
import type { ProfileData } from "@/interfaces/interface"

interface ProfileFieldProps {
  label: string
  value: string
  field: keyof ProfileData
  type?: "text" | "email" | "tel" | "password"
  onValueChange?: (field: keyof ProfileData, newValue: string) => void
}

export default function ProfileField({label,value,field,type = "text",onValueChange,}: ProfileFieldProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState("")

  const handleEdit = useCallback(() => {
    setIsEditing(true)
    setTempValue(field === "password" ? "" : value)
  }, [field, value])

  const handleSave = useCallback(() => {
    if (tempValue.trim()) {
      onValueChange?.(field, field === "password" ? "••••••••••" : tempValue)
    }
    setIsEditing(false)
    setTempValue("")
  }, [tempValue, field, onValueChange])

  const handleCancel = useCallback(() => {
    setIsEditing(false)
    setTempValue("")
  }, [])

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave()
      } else if (e.key === "Escape") {
        handleCancel()
      }
    },
    [handleSave, handleCancel]
  )

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        {isEditing ? (
          <>
            <input
              type={type}
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              onKeyDown={handleKeyPress}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right min-w-[180px]"
              placeholder={field === "password" ? "Enter new password" : ""}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-900 text-right min-w-[180px]">{value}</span>
            <button
              onClick={handleEdit}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Edit3 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
