import { Phone, Mail, FileText, MoreHorizontal } from "lucide-react"

export default function ProfileHeader() {
  return (
    <div className="bg-white rounded-md p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Buyers profile</h1>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
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
