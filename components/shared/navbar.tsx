"use client"

import React from 'react'
import Image from 'next/image'
import { Search, Settings, Bell } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
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
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-gray-600" />
        </button> 
        <Link href="/settings">
          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </Link>
        <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">P</span>
        </div>
      </div>
    </nav>
  )
}