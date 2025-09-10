"use client"

import ChatMessages from "./chat-messages"
import ChatInput from "./chat-input"
import { useProduct } from "@/context/product-context"
import { ChevronLeft, ChevronRight, MessageSquare, Triangle as Translate, Cable as Cube, Monitor } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { messages } from "@/data/mock-data"

export default function ChatSection() {
  const { isChatOpen, toggleChat } = useProduct()

  const uniqueUsers = messages.reduce(
    (acc, message) => {
      if (!acc.find((user) => user.avatar === message.avatar)) {
        acc.push({
          avatar: message.avatar,
          user: message.user,
          isBot: message.isBot,
        })
      }
      return acc
    },
    [] as Array<{ avatar: string; user: string; isBot: boolean }>,
  )

  return (
    <div
      className={`bg-gradient-to-b from-white to-blue-100 flex flex-col transition-all duration-300 ease-in-out ${
        isChatOpen ? "w-1/3" : "w-16"
      }`}
    >
      {isChatOpen ? (
        <>
          <div className=" px-6 py-3">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-900">Today 2:45 PM</h2>
              <button onClick={toggleChat} className="p-3 bg-blue-100 rounded-full">
                <ChevronLeft className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div className="flex flex-col h-full">
          <div className="p-3">
            <button
              onClick={toggleChat}
              className="w-full p-2 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 p-3 space-y-3">
            {uniqueUsers.map((user, index) => (
              <Avatar key={index} className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.user} />
                <AvatarFallback
                  className={user.isBot ? "bg-gradient-to-l from-purple-200 to-blue-600" : "bg-orange-400 text-white"}
                >
                  {user.isBot ? "" : user.user.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="p-3 space-y-3 border-t border-gray-200">
            <button className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
              <Cube className="w-5 h-5 text-blue-600" />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Translate className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </button>
            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Monitor className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
