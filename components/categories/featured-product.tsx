"use client"

import { Plus } from "lucide-react"
import Image from "next/image"
import { useProduct } from "@/context/product-context"
import { featuredProduct } from "@/data/mock-data"
import { BsPencilFill } from "react-icons/bs"

export default function FeaturedProduct() {
  const { openPreview } = useProduct()

  const handleProductClick = () => {
    openPreview(featuredProduct)
  }

  return (
    <div className="px-0 pb-6">
      <div className="bg-white rounded-2xl p-8">
        <div className="flex gap-8">
          <div className="flex-shrink-0">
            <div 
              className="w-80 h-96 bg-gray-100 rounded-2xl p-8 cursor-pointer hover:shadow-lg transition-shadow relative"
              onClick={handleProductClick}
            >
              <Image
                src="/assets/chair1.svg"
                width={300}
                height={320}
                alt="Ox Mathis Chair"
                className="w-full h-64 object-contain"
              />
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900">Ox Mathis Chair</h3>
                <p className="text-sm text-gray-500 mt-1">Hans j. wegner</p>
              </div>
              
              <div className="absolute bottom-4 right-4 flex gap-2">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Image
                    src="/assets/chair1.svg"
                    width={24}
                    height={24}
                    alt="Chair thumbnail"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                  <Plus className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Summer Chairs</h2>
              <BsPencilFill className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                The Swedish Designer Monica Forstar's Style Is Characterised By Her Enternal Love For New Materials And Beautiful Pure Shapes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}