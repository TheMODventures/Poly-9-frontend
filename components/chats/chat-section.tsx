"use client"

import ChatMessages from "./chat-messages"
import ChatInput from "./chat-input"
import { useProduct } from "@/context/product-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { messages } from "@/data/mock-data"
import Image from "next/image";import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa"
import { usePathname } from "next/navigation";

export default function ChatSection() {
  const { isChatOpen, toggleChat } = useProduct()
  const pathname = usePathname();
  const isContextFile = pathname === "/context-file";

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
        <div className="relative px-6 py-8">
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex items-center w-full max-w-md">
              <hr className="flex-1 border-gray-300 mr-4" />
              <h2 className="font-inter text-gray-500 whitespace-nowrap">
                Today 2:45 PM
              </h2>
              <hr className="flex-1 border-gray-300 ml-4" />
            </div>
          </div>

          {!isContextFile && (
            <button
              onClick={toggleChat}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full"
            >
              <FaAngleLeft className="w-12 h-12 border-2 border-gray-300 p-2 rounded-full bg-gray-100 text-blue-500" />
            </button>
          )}
        </div>

          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div className="flex flex-col h-full border-r-8 border-gray-100">
          <div className="p-2">
          <button
            onClick={toggleChat}
            className="p-0 mt-1 rounded-full whitespace-nowrap"
          >
            <FaAngleRight className="w-12 h-12 border-2 border-gray-300 p-2 rounded-full bg-gray-100 text-blue-500" />
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
                  <Image src="/assets/editbox.svg" alt="Edit Box" width={26} height={26} />
                </button>

                <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <Image src="/assets/fileadd.svg" alt="File Add" width={26} height={26} />
                </button>

                <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <Image src="/assets/qouta.svg" alt="Message" width={26} height={26} />
                </button>

                <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
                  <Image src="/assets/chatroom.svg" alt="Monitor" width={26} height={26} />
                </button>
              </div>
        </div>
      )}
    </div>
  )
}
