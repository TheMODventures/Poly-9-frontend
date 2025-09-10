"use client"

import React from 'react'
import Sidebar from '@/components/shared/sidebar'
import Navbar from '@/components/shared/navbar'

function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex" style={{ height: 'calc(100vh - 50px)' }}>
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-auto relative  bg-gradient-to-t from-blue-50 via-purple-50 to-white">
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-[#00000021]/13">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RootLayout