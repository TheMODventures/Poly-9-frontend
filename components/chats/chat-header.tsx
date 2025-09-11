import { BsThreeDots } from "react-icons/bs"

export default function ChatHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl font-inter text-gray-900" style={{fontWeight:"700"}}>Chats</h1>
      <div className="flex items-center gap-3">
          <BsThreeDots className="w-5 h-5"/>
      </div>
    </div>
  )
}
