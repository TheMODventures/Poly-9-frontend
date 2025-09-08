"use client"

import { useState } from "react"
import ProfilePhoto from "@/components/helper/profile-photo"
import ProfileField from "@/components/helper/profile-field"
import type { ProfileData } from "@/interfaces/interface"
import { getInitials } from "@/utils/helper"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "John Wick",
    phone: "+1 736 728 2899",
    designation: "Senior Risk Associate",
    email: "john@traderisk.fi",
    password: "••••••••••",
  })

  const handleValueChange = (field: keyof ProfileData, newValue: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: newValue,
    }))
  }

  return (
    <div className="h-screen w-11/12 mt-10 p-12">
      <div className="mx-auto">
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
                onValueChange={handleValueChange}
              />

              <ProfileField
                label="Phone number"
                value={profileData.phone}
                field="phone"
                type="tel"
                onValueChange={handleValueChange}
              />

              <ProfileField
                label="Designation"
                value={profileData.designation}
                field="designation"
                onValueChange={handleValueChange}
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
                onValueChange={handleValueChange}
              />

              <ProfileField
                label="Password"
                value={profileData.password}
                field="password"
                type="password"
                onValueChange={handleValueChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
