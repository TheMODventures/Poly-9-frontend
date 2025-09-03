import ProductCard from "./product-card"
import { collectionsProducts, productsItems } from "@/data/mock-data"

interface BestsellersProps {
  type: "collections" | "products"
}

export default function Bestsellers({ type }: BestsellersProps) {
  const products = type === "collections" ? collectionsProducts : productsItems

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Bestsellers</h3>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">View all</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}
