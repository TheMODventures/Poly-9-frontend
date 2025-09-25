"use client";

import { Edit3 } from "lucide-react";

interface ProfilePhotoProps {
  initials: string;
  profilePhoto?: string | null;
  onPhotoChange: () => void;
}

export default function ProfilePhoto({
  initials,
  profilePhoto,
  onPhotoChange,
}: ProfilePhotoProps) {
  return (
    <div className="flex items-center justify-between py-2 scale-98 border-b border-gray-100">
      <span className="text-sm font-semibold text-gray-800">Profile Photo</span>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{initials}</span>
            </div>
          )}
        </div>
        <button
          onClick={onPhotoChange}
          className="text-sm text-gray-600 cursor-pointer underline hover:text-gray-800 transition-colors"
        >
          Change photo
        </button>
        <button
          onClick={onPhotoChange}
          className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        >
          <Edit3 size={16} />
        </button>
      </div>
    </div>
  );
}
