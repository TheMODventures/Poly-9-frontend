import { Button } from "@/components/ui/button"
import { Copy, RotateCcw, Share, Bookmark, MoreHorizontal } from "lucide-react"

interface MessageActionsProps {
  tokens?: string
}

export default function MessageActions({ tokens }: MessageActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <RotateCcw className="w-3 h-3 text-gray-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Copy className="w-3 h-3 text-gray-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Share className="w-3 h-3 text-gray-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <Bookmark className="w-3 h-3 text-gray-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <MoreHorizontal className="w-3 h-3 text-gray-500" />
        </Button>
      </div>
      {tokens && <span className="text-xs text-gray-700 font-semibold bg-gray-100 p-1 rounded-md">{tokens}</span>}
    </div>
  )
}
