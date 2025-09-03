import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import MessageActions from "./message-actions"
import { messages } from "@/data/mock-data"

export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback
              className={message.isBot ? "bg-gradient-to-l from-purple-200 to-blue-600 text-white" : "bg-orange-400 text-white"}
            >
              {message.avatar}
            </AvatarFallback>
          </Avatar>

          {/* Message content */}
          <div className="flex-1 min-w-0">
            {/* User name + time */}
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900 text-sm">{message.user}</span>
              <span className="text-xs text-gray-500">{message.time}</span>
            </div>

            {/* Bot vs User */}
            {message.isBot ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
                <div className="mt-3 flex items-center justify-between">
                  <MessageActions tokens={message.tokens} />
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{message.content}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
