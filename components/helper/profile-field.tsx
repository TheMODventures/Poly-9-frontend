"use client"

import type React from "react"
import { Edit3 } from "lucide-react"
import type { ProfileData } from "@/interfaces/interface"

interface ProfileFieldProps {
  label: string
  value: string
  field: keyof ProfileData
  type?: "text" | "email" | "tel" | "password"
  editingField: string | null
  tempValue: string
  onEdit: (field: keyof ProfileData, value: string) => void
  onSave: (field: keyof ProfileData) => void
  onCancel: () => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>, field: keyof ProfileData) => void
  onTempValueChange: (value: string) => void
}

export default function ProfileField({
  label,
  value,
  field,
  type = "text",
  editingField,
  tempValue,
  onEdit,
  onSave,
  onCancel,
  onKeyPress,
  onTempValueChange,
}: ProfileFieldProps) {
  const isEditing = editingField === field

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <div className="flex items-center gap-3">
        {isEditing ? (
          <>
            <input
              type={type}
              value={tempValue}
              onChange={(e) => onTempValueChange(e.target.value)}
              onKeyDown={(e) => onKeyPress(e, field)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-right min-w-[180px]"
              placeholder={field === "password" ? "Enter new password" : ""}
              autoFocus
            />
            <button
              onClick={() => onSave(field)}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Save
            </button>
            <button onClick={onCancel} className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600">
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-900 text-right min-w-[180px]">{value}</span>
            <button
              onClick={() => onEdit(field, value)}
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
