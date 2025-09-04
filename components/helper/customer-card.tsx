interface CustomerCardProps {
  name: string
  memberSince: number
  items: number
  totalSpent: number
  returnRate: number
}

export default function CustomerCard({ name, memberSince, items, totalSpent, returnRate }: CustomerCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full opacity-50"></div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h4 className="font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">Member since {memberSince}</p>

        <div className="flex justify-between text-sm mt-4">
          <div>
            <div className="font-semibold text-gray-900">{items}</div>
            <div className="text-gray-500">Items purchased</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900">${totalSpent}</div>
            <div className="text-gray-500">Total spent</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Customer return rate</span>
            <span className="font-semibold">{returnRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full relative" style={{ width: `${returnRate}%` }}>
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
