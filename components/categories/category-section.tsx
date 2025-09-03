"use client"

import CollectionsHeader from "./category-header"
import CategoryTabs from "./category-tabs"
import TopCategories from "./top-category"
import FeaturedProduct from "./featured-product"
import PopularProducts from "./popular-products"
import ProductPreview from "./product-preview"
import { useProduct } from "@/context/product-context"

export default function CategorySection() {
  const { isPreviewMode } = useProduct()

  if (isPreviewMode) {
    return <ProductPreview />
  }

  return (
    <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 border-l shadow-2xl shadow-blue-100 border-gray-200 flex flex-col">
      <CollectionsHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <CategoryTabs />
        <TopCategories />
        <FeaturedProduct />
        <PopularProducts />
      </div>
    </div>
  )
}
