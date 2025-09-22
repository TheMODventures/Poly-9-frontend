"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageActions from "./message-actions";
import { useChatMessages, useChatStore } from "@/store/chat.store";
import { formatTime, getInitials } from "@/utils/helper";

function renderContent(content: string) {
  return content.split(/\n{2,}/).map((paragraph, index) => (
    <p key={index} className="text-sm text-gray-700 leading-relaxed">
      {paragraph}
    </p>
  ));
}

export default function ChatMessages() {
  const messages = useChatMessages();
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      {messages.length === 0 && !isLoading && (
        <div className="text-center text-gray-400 text-sm mt-12">
          Ask LanguageGUI to generate new product concepts to get started.
        </div>
      )}

      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">
          <div className="flex-1 min-w-0">
            {message.role === "assistant" ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    {message.avatar ? (
                      <AvatarImage src={message.avatar} alt={message.author} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-l from-purple-200 to-blue-600">
                      {!message.avatar ? getInitials(message.author) : ""}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900 text-sm">
                    {message.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
                <div className="space-y-3 ml-10">
                  {renderContent(message.content)}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <MessageActions />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    {message.avatar ? (
                      <AvatarImage src={message.avatar} alt={message.author} />
                    ) : null}
                    <AvatarFallback className="bg-orange-400 text-white">
                      {getInitials(message.author)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900 text-sm">
                    {message.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed ml-10 whitespace-pre-line">
                  {message.content}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-pulse">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-l from-purple-200 to-blue-600" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-12 bg-gray-100 rounded" />
              </div>
              <div className="space-y-2 ml-10">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {error && <div className="text-sm text-red-500 text-center">{error}</div>}
    </div>
  );
}
