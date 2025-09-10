"use client"

import CollectionsHeader from "./category-header"
import CollectionGrid from "./collection-grid"
import FeaturedProduct from "./featured-product"
import ProductPreview from "./product-preview"
import TransformProduct from "./transform-product"
import { useProduct } from "@/context/product-context"

export default function CategorySection() {
  const { isPreviewMode, isChatOpen } = useProduct()

  return (
    <div
      className={`bg-white flex flex-col transition-all duration-300 ease-in-out ${
        isChatOpen ? "w-2/3" : "w-full"
      }`}
    >
      <CollectionsHeader />
      
      {isPreviewMode ? (
        <div className="flex flex-1 overflow-hidden space-y-8">
          <ProductPreview />
          <TransformProduct />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-8 p-6">
          <CollectionGrid />
          <FeaturedProduct />
        </div>
      )}
    </div>
  )
}