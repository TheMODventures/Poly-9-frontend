import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MessageActions from "./message-actions"
import { messages } from "@/data/mock-data"

export default function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
      {messages.map((message) => (
        <div key={message.id} className="flex gap-3">
          <div className="flex-1 min-w-0">
            {message.isBot ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={message.avatar} alt={message.user} />
                    <AvatarFallback className="bg-gradient-to-l from-purple-200 to-blue-600"></AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900 text-sm">{message.user}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed ml-10">{message.content}</p>
                <div className="mt-3 flex items-center justify-between">
                  <MessageActions tokens={message.tokens} />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={message.avatar} alt={message.user} />
                    <AvatarFallback className="bg-orange-400 text-white">
                      {message.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900 text-sm">{message.user}</span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed ml-10">{message.content}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
