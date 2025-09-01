"use client"

import React from 'react'
import Sidebar from '@/components/shared/sidebar'
import Navbar from '@/components/shared/navbar'
import { usePathname } from 'next/navigation'

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen font-sans bg-[#00000021]/13">
      <Navbar />
      <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-auto relative">
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#00000021]/13">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RootLayout