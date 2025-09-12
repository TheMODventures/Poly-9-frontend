"use client"

import CollectionsHeader from "./category-header"
import CollectionGrid from "./collection-grid"
import FeaturedProduct from "./featured-product"
import ProductPreview from "./product-preview"
import TransformProduct from "./transform-product"
import Loader from "@/components/helper/loader"
import { useProduct } from "@/context/product-context"
import { useEffect, useState } from "react"

export default function CategorySection() {
  const { isPreviewMode, isChatOpen } = useProduct()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isPreviewMode) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isPreviewMode])

  return (
    <div
      className={`bg-white flex flex-col transition-all duration-300 ease-in-out ${
        isChatOpen ? "w-2/3" : "w-full"
      }`}
    >
      {isPreviewMode && isLoading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  )
}
