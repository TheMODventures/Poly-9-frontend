import Image from "next/image"

interface ProductCardProps {
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: "NEW" | "SALE" | null
}

export default function ProductCard({ name, price, originalPrice, image, badge }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative mb-3">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
        {badge && (
          <div
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-medium rounded ${
              badge === "NEW" ? "bg-black text-white" : "bg-red-500 text-white"
            }`}
          >
            {badge}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h4 className="font-medium text-sm text-gray-900">{name}</h4>
        <div className="flex items-center gap-2">
          {originalPrice && <span className="text-xs text-gray-400 line-through">${originalPrice}</span>}
          <span className="text-sm font-semibold text-gray-900">${price}</span>
        </div>
        <div className="flex gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <div key={star} className="w-3 h-3 bg-gray-200 rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
