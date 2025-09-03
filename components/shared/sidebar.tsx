"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { links } from "@/utils/links"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
      <div className="flex flex-col space-y-4">
        {links.map(({ href, icon: Icon }) => {
          const isActive = pathname === href

          return (
            <Link key={href} href={href}>
              <button
                className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
                  isActive ? "bg-blue-500 text-black" : "hover:bg-gray-100 text-black"
                }`}
              >
                <Icon className="w-6 h-6" />
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
