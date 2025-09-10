"use client"

import React from 'react'
import { User } from 'lucide-react'
import { notifications } from '@/data/mock-data'

export default function NotificationsDropdown() {
  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-lg py-4">
      <div className="px-4 pb-3 border-b border-gray-100">
        <h3 className="text-xl font-inter text-gray-900" style={{fontWeight:"700"}}>Notifications</h3>
      </div>
      
      {/* Notifications List */}
      <div className="py-2">
        {notifications.map((notification) => (
          <div key={notification.id} className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition-colors">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  {notification.type}
                </p>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 ${notification.avatarColor} rounded-full flex items-center justify-center`}>
                    <User className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {notification.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {notification.timeAgo}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}