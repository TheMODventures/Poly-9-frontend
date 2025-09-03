"use client"

import { Heart } from "lucide-react"
import Image from "next/image"
import { GoPeople } from "react-icons/go"
import { useProduct } from "@/context/product-context"
import { featuredProduct } from "@/data/mock-data"

export default function FeaturedProduct() {
  const { openPreview } = useProduct()

  const handleProductClick = () => {
    openPreview(featuredProduct)
  }

  return (
    <div>
      <div className="bg-gradient-to-b from-white to-blue-50 rounded-lg p-4 space-y-4">
        <div className="flex gap-4">
          <div
            className="w-62 h-80 bg-white rounded-lg flex-shrink-0 overflow-hidden p-8 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={handleProductClick}
          >
            <Image
              src="/assets/chair.svg"
              width={400}
              height={400}
              alt="Ox Maidens Chair"
              className="w-full h-full object-cover -translate-y-10"
            />
            <div className="-translate-y-12 p-2">
              <h4 className="font-medium text-gray-900">Ox Maidens Chair</h4>
              <p className="text-sm text-gray-500">Hans J. Wegner</p>
              <p className="text-lg font-semibold text-blue-500 mt-1">$9.99</p>
            </div>
          </div>

          <div className=" min-w-0 space-y-2">
            <h2 className="font-semibold text-gray-900 text-xl mb-4">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-10">
              The Swedish Designer Monica Forstar's Style Is Characterised By Her Enternal Love For New Materials And
              Beautiful Pure Shapes.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <GoPeople className="w-4 h-4" />
                  <span>341 Seen</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>294 Liked</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-400 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-600 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white"></div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((star) => (
                <svg key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <svg className="w-4 h-4 fill-gray-300 text-gray-300" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
