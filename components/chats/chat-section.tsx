"use client";
import { useEffect, useMemo } from "react";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { useProduct } from "@/context/product-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { FaAngleRight } from "react-icons/fa";
import { useChatMessages, useChatStore } from "@/store/chat.store";
import { formatTime, getChatWidthClasses, getInitials } from "@/utils/helper";
import { useAuthUser } from "@/store/auth.store";

export default function ChatSection() {
  const { isChatOpen, toggleChat } = useProduct();
  const authUser = useAuthUser();
  const chatMessages = useChatMessages();
  const variations = useChatStore((state) => state.imageVariations);

  const hasMessages = chatMessages.length > 0;
  const hasVariations = variations.length > 0;

  const defaultUsers = useMemo(
    () => [
      {
        avatar: null,
        name: authUser?.name?.trim() || "You",
        isBot: false,
      },
      { avatar: "/assets/users/bot.png", name: "LanguageGUI", isBot: true },
    ],
    [authUser?.name]
  );

  const uniqueUsers = useMemo(() => {
    if (!chatMessages.length) {
      return defaultUsers;
    }

    const seen = new Map<
      string,
      { avatar: string | null; name: string; isBot: boolean }
    >();

    chatMessages.forEach((message) => {
      if (!seen.has(message.author)) {
        seen.set(message.author, {
          avatar: message.avatar ?? null,
          name: message.author,
          isBot: message.role === "assistant",
        });
      }
    });

    return Array.from(seen.values());
  }, [chatMessages, defaultUsers]);

  const latestMessage = chatMessages[chatMessages.length - 1];
  const headerTimestamp = latestMessage
    ? `Today ${formatTime(latestMessage.createdAt)}`
    : "Today 2:45 PM";

  // 🔑 Width logic centralized here
  const chatWidthClass = getChatWidthClasses(isChatOpen, hasVariations);

  useEffect(() => {
    if (!hasMessages && !isChatOpen) {
      toggleChat();
    }
  }, [hasMessages, isChatOpen, toggleChat]);

  return (
    <div
      className={`bg-gradient-to-b from-white to-blue-100 flex flex-col transition-all duration-300 ease-in-out ${chatWidthClass}`}
    >
      {isChatOpen ? (
        <>
          <div className="relative px-6 py-8">
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="flex items-center w-full max-w-md">
                <hr className="flex-1 border-gray-300 mr-4" />
                <h2 className="font-inter text-gray-500 whitespace-nowrap">
                  {headerTimestamp}
                </h2>
                <hr className="flex-1 border-gray-300 ml-4" />
              </div>
            </div>
          </div>

          <ChatMessages />
          <ChatInput />
        </>
      ) : (
        <div className="flex flex-col h-full border-r-8 border-gray-100">
          <div className="p-2">
            {hasMessages && (
              <button
                onClick={toggleChat}
                className="p-0 mt-1 rounded-full whitespace-nowrap"
              >
                <FaAngleRight className="w-12 h-12 border-2 border-gray-300 p-2 rounded-full bg-gray-100 text-blue-500" />
              </button>
            )}
          </div>

          <div className="flex-1 p-3 space-y-3">
            {uniqueUsers.map((user, index) => (
              <Avatar key={index} className="w-10 h-10">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : null}
                <AvatarFallback
                  className={
                    user.isBot
                      ? "bg-gradient-to-l from-purple-200 to-blue-600"
                      : "bg-orange-400 text-white"
                  }
                >
                  {!user.avatar ? getInitials(user.name) : ""}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="p-3 space-y-3 border-t border-gray-200">
            <button className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors">
              <Image
                src="/assets/editbox.svg"
                alt="Edit Box"
                width={26}
                height={26}
              />
            </button>

            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Image
                src="/assets/fileadd.svg"
                alt="File Add"
                width={26}
                height={26}
              />
            </button>

            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Image
                src="/assets/qouta.svg"
                alt="Message"
                width={26}
                height={26}
              />
            </button>

            <button className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Image
                src="/assets/chatroom.svg"
                alt="Monitor"
                width={26}
                height={26}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
