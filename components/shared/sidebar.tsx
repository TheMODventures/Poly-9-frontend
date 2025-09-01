"use client"

import React from 'react'
import { LuLayoutGrid } from "react-icons/lu";
import { IoPersonOutline, IoSettingsOutline  } from "react-icons/io5";
import { BiSolidMessageRounded } from "react-icons/bi";
import { MdLogout } from "react-icons/md";

export default function Sidebar() {
  return (
    <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
        <LuLayoutGrid className="w-6 h-6 text-black" />
      </div>
      <div className="flex flex-col space-y-4">
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
          <IoPersonOutline className="w-6 h-6 text-black" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
          <BiSolidMessageRounded className="w-6 h-6 text-black fill-current" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
          <IoSettingsOutline className="w-6 h-6 text-black" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors">
          <MdLogout className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  )
}