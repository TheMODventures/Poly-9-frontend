import { Button } from "@/components/ui/button"

export default function ChatHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
      <div className="flex items-center gap-3">
        <Button 
          size="sm" 
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-1"
        >
          + New chat
        </Button>
      </div>
    </div>
  )
}
