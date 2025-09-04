import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CategoryHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
      <Button variant="ghost" size="sm" className="p-1">
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </Button>
      <h2 className="font-semibold text-gray-900 text-2xl">Collections</h2>
    </div>
  )
}
