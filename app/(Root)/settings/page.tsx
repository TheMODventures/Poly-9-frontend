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
    <div className="h-screen w-11/12 mt-28">
      <div className="mx-auto">
        <div className="bg-white rounded-lg shadow-sm border mb-3 border-gray-200 p-8">
          <div className="mb-1">
            <h1 className="text-4xl font-inter text-gray-900" style={{ fontWeight: "700" }}>Settings</h1>
          </div>
        </div>

        <div className="p-15 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="mb-0 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
            <h2 className="text-lg font-poppins text-blue-600 ml-2 mb-2" style={{fontWeight:"500"}}>Buyer Information</h2>
            <div className="space-y-2">
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfilePhoto
                  initials={getInitials(profileData.name)}
                  onPhotoChange={() => console.log("Photo change requested")}
                />
              </div>
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfileField
                  label="Name"
                  value={profileData.name}
                  field="name"
                  onValueChange={handleValueChange}
                />
              </div>
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfileField
                  label="Phone number"
                  value={profileData.phone}
                  field="phone"
                  type="tel"
                  onValueChange={handleValueChange}
                />
              </div>

              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfileField
                  label="Designation"
                  value={profileData.designation}
                  field="designation"
                  onValueChange={handleValueChange}
                />
              </div>
            </div>

            <div className="">
              <h2 className="text-lg font-poppins text-blue-600 mb-3 ml-2 mt-3" style={{fontWeight:"500"}}>Login Details</h2>
              <div className="space-y-2">
                <div className="border border-gray-300 p-0 rounded-md items-center">
                  <ProfileField
                    label="User email"
                    value={profileData.email}
                    field="email"
                    type="email"
                    onValueChange={handleValueChange}
                  />
                </div>
                <div className="border border-gray-300 p-0 rounded-md items-center">
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
      </div>
    </div>
  )
}
