import { Button } from "@/components/ui/button"
import Image from "next/image"
import { products } from "@/data/mock-data"

export default function PopularProducts() {
  return (
    <div>
      <div className="flex items-center space-x-70 mb-4">
        <h3 className="font-semibold text-gray-900">Popular</h3>
        <Button variant="ghost" className="text-blue-500 hover:text-blue-600 text-sm p-0 h-auto">
          View All
        </Button>
      </div>
      <div className="space-x-3 flex">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg p-3 flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
              <Image
                src={product.image}
                width={48}
                height={48}
                alt={product.name}
                className="w-full h-full object-cover p-1"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
              <p className="text-xs text-gray-500">{product.brand}</p>
              <p className="text-sm font-semibold text-blue-500 mt-1">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
