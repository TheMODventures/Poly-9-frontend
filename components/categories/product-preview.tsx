"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Download } from "lucide-react"
import Image from "next/image"
import { useProduct } from "@/context/product-context"
import TransformDialog from "@/components/helper/transform-dialog"

export default function ProductPreview() {
  const { selectedProduct, closePreview } = useProduct()

  if (!selectedProduct) return null

  return (
    <div className="w-1/2 bg-gradient-to-b from-white to-blue-50 border-l shadow-2xl shadow-blue-100 border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={closePreview} className="p-2 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h2 className="font-semibold text-gray-900">Collections</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <Check className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100">
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <h3 className="font-medium text-gray-900">Live Customization</h3>
        <div className="flex gap-2">
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            Preview
          </Button>
          <TransformDialog>
            <Button size="sm" variant="outline">
              Transform
            </Button>
          </TransformDialog>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-80 h-80 flex items-center justify-center mb-8">
          <Image
            src={selectedProduct.image || "/placeholder.svg"}
            width={320}
            height={320}
            alt={selectedProduct.name}
            className="w-full h-full object-contain"
          />
        </div>

        {selectedProduct.colors && (
          <div className="flex gap-3 mb-8">
            {selectedProduct.colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full border-2 border-white shadow-md cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
            <Button size="sm" className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0">
              +
            </Button>
          </div>
        )}
      </div>

      <div className="p-6 bg-white/50">
        <h4 className="font-semibold text-gray-900 mb-3">Description</h4>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{selectedProduct.description}</p>

        <div className="flex gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
            <Image
              src="/assets/chair1.svg"
              width={48}
              height={48}
              alt="Related product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0">
            <Image
              src="/assets/chair2.svg"
              width={48}
              height={48}
              alt="Related product"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <Button size="sm" className="w-12 h-12 rounded-lg bg-blue-500 hover:bg-blue-600 text-white p-0">
            +
          </Button>
        </div>
      </div>
    </div>
  )
}
