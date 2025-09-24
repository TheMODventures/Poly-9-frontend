"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronDown, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfilePhoto from "@/components/helper/profile-photo";
import ProfileField from "@/components/helper/profile-field";
import type { ProfileData, PasswordData } from "@/interfaces/interface";
import { getInitials } from "@/utils/helper";
import { useGetUser } from "@/services/query";
import { useUploadFile } from "@/services/mutation/buyer.mutation";
import { useUpdateUser, useChangePassword } from "@/services/mutation/user.mutation";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveImageUrl } from "@/utils/image";
import ChangePasswordForm from "@/components/forms/settings/change-password.form";

export default function SettingsPage() {
  const { data: userResponse, isLoading, isError, error } = useGetUser();
  const userProfile = userResponse?.data;
  
  const uploadFileMutation = useUploadFile();
  const updateUserMutation = useUpdateUser();

  const [isPasswordExpanded, setIsPasswordExpanded] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  const handleValueChange = (field: keyof ProfileData, newValue: string) => {
    // Map ProfileData fields to UpdateUserPayload fields
    const updatePayload: any = {};
    
    switch (field) {
      case 'name':
        updatePayload.name = newValue;
        break;
      case 'phone':
        updatePayload.phone = newValue;
        break;
      case 'designation':
        updatePayload.designation = newValue;
        break;
      case 'email':
        // Email is read-only, shouldn't be updated
        return;
      case 'password':
        // Password handled separately
        return;
    }
    
    updateUserMutation.mutate(updatePayload);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadFileMutation.mutate(file, {
        onSuccess: (uploadResponse) => {
          const imageUrl = uploadResponse.url;
          updateUserMutation.mutate({
            profilePhoto: imageUrl
          }, {
            onSuccess: () => {
              setIsImageDialogOpen(false);
            }
          });
        }
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen w-11/12 mt-28">
        <div className="mx-auto">
          {/* Header Skeleton */}
          <div className="bg-white rounded-lg shadow-sm border mb-3 border-gray-200 p-8">
            <div className="mb-1">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="p-15 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="mb-0 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border border-gray-300 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-screen w-11/12 mt-28">
        <div className="mx-auto">
          <div className="bg-white rounded-lg shadow-sm border mb-3 border-gray-200 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-red-600 mb-2">Error Loading Settings</h1>
              <p className="text-gray-600 mb-4">{error?.message || "Failed to load user data"}</p>
              <Button onClick={() => window.location.reload()}>
                Retry
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-11/12 mt-28">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border mb-3 border-gray-200 p-8">
          <div className="mb-1">
            <h1 className="text-4xl font-inter text-gray-900" style={{ fontWeight: "700" }}>Settings</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-15 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="mb-0 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
          {/* User Information Section */}
            <h2 className="text-lg font-poppins text-blue-600 ml-2 mb-2" style={{fontWeight:"500"}}>User Information</h2>
            <div className="space-y-2">
            {/* Profile Photo */}
              <div className="border border-gray-300 p-0 rounded-md items-center relative">
                <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
                  <ProfilePhoto
                    initials={getInitials(userProfile?.name || "")}
                    profilePhoto={userProfile?.profilePhoto ? resolveImageUrl(userProfile.profilePhoto) : null}
                    onPhotoChange={() => setIsImageDialogOpen(true)}
                  />
                  {uploadFileMutation.isPending && (
                    <div className="absolute top-2 right-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                  )}
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Profile Photo</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-4">
                          Choose an image file to upload
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button asChild>
                          <label htmlFor="image-upload" className="cursor-pointer">
                            Select Image
                          </label>
                        </Button>
                  </div>
                </div>
                  </DialogContent>
                </Dialog>
            </div>

            {/* Name */}
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfileField
                  label="Name"
                  value={userProfile?.name || ""}
                  field="name"
                  onValueChange={handleValueChange}
                />
            </div>

              {/* Phone Number */}
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfileField
                  label="Phone number"
                  value={userProfile?.phone || ""}
                  field="phone"
                  type="tel"
                  onValueChange={handleValueChange}
                />
            </div>

            {/* Designation */}
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <ProfileField
                  label="Designation"
                  value={userProfile?.designation || ""}
                  field="designation"
                  onValueChange={handleValueChange}
                />
            </div>
          </div>

          {/* Login Details Section */}
            <div className="">
              <h2 className="text-lg font-poppins text-blue-600 mb-3 ml-2 mt-3" style={{fontWeight:"500"}}>Login Details</h2>
              <div className="space-y-2">
              {/* User Email */}
              <div className="border border-gray-300 p-0 rounded-md items-center">
                <div className="flex items-center justify-between py-3 scale-98 border-b border-gray-100">
                  <span className="text-sm font-semibold text-gray-800">User email</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-900 text-right min-w-[180px]">{userProfile?.email || ""}</span>
                </div>
              </div>
            </div>

                {/* Change Password */}
                <div className="border border-gray-300 p-0 rounded-md items-center">
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-semibold text-gray-700">Change Password</Label>
                <Button
                  variant="ghost"
                  size="sm"
                        onClick={() => setIsPasswordExpanded(!isPasswordExpanded)}
                        className="p-1"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isPasswordExpanded ? 'rotate-180' : ''}`} />
                </Button>
              </div>

                    {isPasswordExpanded && (
                      <div className="mt-4">
                        <ChangePasswordForm 
                          onSuccess={() => setIsPasswordExpanded(false)}
                        />
                  </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}