import ProductCard from "./product-card"
import { collectionsProducts, productsItems } from "@/data/mock-data"

interface BestsellersProps {
  type: "collections" | "products"
}

export default function Bestsellers({ type }: BestsellersProps) {
  const products = type === "collections" ? collectionsProducts : productsItems

  return (
    <div className="bg-gradient-to-tr from-blue-50 via-purple-50 to-white p-4">
      <div className="flex items-center justify-between mb-6 p-2">
        <h3 className="text-2xl ml-2 font-poppins" style={{fontWeight:"600"}}>All {type.charAt(0).toUpperCase() + type.slice(1)}</h3>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">View all</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}
