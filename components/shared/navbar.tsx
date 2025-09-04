"use client"

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Search, Settings, Bell } from 'lucide-react'
import Link from 'next/link'
import NotificationsDropdown from '@/components/shared/notification'

export default function Navbar() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }

    if (isNotificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isNotificationsOpen])

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
        
        <div className="relative" ref={notificationRef}>
          <button 
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          
          {isNotificationsOpen && (
            <div className="absolute right-0 top-10 z-50">
              <NotificationsDropdown />
            </div>
          )}
        </div>
        
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">P</span>
        </div>
      </div>
    </nav>
  )
}