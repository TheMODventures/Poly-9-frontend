"use client";

import React from "react";
import Image from "next/image";
import { Search, Settings } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { getInitials } from "@/utils/helper";

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <nav className="w-full h-12 bg-[#00000021]/13 border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Image
          src="/assets/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        <Link href="/settings">
          <button className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
        {user?.profilePhoto ? (
          <img
            src={user?.profilePhoto}
            alt="Profile"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {getInitials(user?.name)}
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}
