"use client"

import type React from "react"
import { useState, useCallback } from "react"
import ProfilePhoto from "@/components/helper/profile-photo"
import ProfileField from "@/components/helper/profile-field"
import type { ProfileData } from "@/interfaces/interface"
import { getInitials, handleCancel, handleEdit } from "@/utils/helper"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Wick",
    phone: "+1 736 728 2899",
    designation: "Senior Risk Associate",
    email: "john@traderisk.fi",
    password: "••••••••••",
  })
  const [editingField, setEditingField] = useState<keyof ProfileData | null>(null)
  const [tempValue, setTempValue] = useState<string>("")

const handleSave = useCallback(
    (field: keyof ProfileData): void => {
      if (tempValue.trim()) {
        setProfileData((prev) => ({
          ...prev,
          [field]: field === "password" ? "••••••••••" : tempValue,
        }))
      }
      setEditingField(null)
      setTempValue("")
    },
    [tempValue],
  )


const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, field: keyof ProfileData): void => {
      if (e.key === "Enter") {
        handleSave(field)
      } else if (e.key === "Escape") {
        handleCancel()
      }
    },
    [handleSave, handleCancel],
  )


  return (
    <div className="h-screen w-11/12 mt-10 p-12">
      <div className=" mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          </div>

          <div className="mb-5 border border-gray-200 p-3">
            <h2 className="text-lg font-medium text-blue-600 border-b">Buyer Information</h2>

            <div className="space-y-0">
              <ProfilePhoto
                initials={getInitials(profileData.name)}
                onPhotoChange={() => console.log("Photo change requested")}
              />

              <ProfileField
                label="Name"
                value={profileData.name}
                field="name"
                editingField={editingField}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onKeyPress={handleKeyPress}
                onTempValueChange={setTempValue}
              />

              <ProfileField
                label="Phone number"
                value={profileData.phone}
                field="phone"
                type="tel"
                editingField={editingField}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onKeyPress={handleKeyPress}
                onTempValueChange={setTempValue}
              />

              <ProfileField
                label="Designation"
                value={profileData.designation}
                field="designation"
                editingField={editingField}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onKeyPress={handleKeyPress}
                onTempValueChange={setTempValue}
              />
            </div>
          </div>

          <div className="border border-gray-200 p-3">
            <h2 className="text-lg font-medium text-blue-600 mb-2 border-b border-gray-200">Login Details</h2>

            <div className="space-y-0">
              <ProfileField
                label="User email"
                value={profileData.email}
                field="email"
                type="email"
                editingField={editingField}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onKeyPress={handleKeyPress}
                onTempValueChange={setTempValue}
              />

              <ProfileField
                label="Password"
                value={profileData.password}
                field="password"
                type="password"
                editingField={editingField}
                tempValue={tempValue}
                onEdit={handleEdit}
                onSave={handleSave}
                onCancel={handleCancel}
                onKeyPress={handleKeyPress}
                onTempValueChange={setTempValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
