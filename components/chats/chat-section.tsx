import ChatMessages from "./chat-messages"
import ChatInput from "./chat-input"
import { MdOutlineEdit } from "react-icons/md";

export default function ChatSection() {
  return (
    <div className="flex-1 bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-gray-900">New Chat</h2>
          <button className="">
            <MdOutlineEdit className="w-6 h-6"/>
          </button>
        </div>
      </div>
      <ChatMessages />
      <ChatInput />
    </div>
  )
}
