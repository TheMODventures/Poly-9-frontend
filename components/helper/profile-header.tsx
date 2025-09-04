import { Phone, Mail, FileText } from "lucide-react"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { BsThreeDots } from "react-icons/bs"
import Link from "next/link"

export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Buyers profile</h1>
        <div className="absolute top-14 right-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <BsThreeDots className="w-6 h-6 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/chat">Chat</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/context-file">Context Files</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Contact</span>
          <span className="text-sm font-medium text-gray-900">+84 037346950</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Email</span>
          <span className="text-sm font-medium text-gray-900">giangbanganh@gmail.com</span>
        </div>

        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-blue-500" />
          <span className="text-sm text-gray-600">Details</span>
          <span className="text-sm font-medium text-gray-900">Company address</span>
        </div>
      </div>
    </div>
  )
}
