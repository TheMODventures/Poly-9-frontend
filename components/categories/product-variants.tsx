"use client"

import Image from "next/image"
import { Plus } from "lucide-react"

interface ProductVariantsProps {
  variants: Array<{ src: string; alt: string }>
  onAdd?: () => void
}

export default function ProductVariants({ variants, onAdd }: ProductVariantsProps) {
  return (
    <div className="flex gap-4 mb-6">
      {variants.map((variant, index) => (
        <div key={index} className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={variant.src}
            width={80}
            height={64}
            alt={variant.alt}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div
        className="w-20 h-16 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={onAdd}
      >
        <Plus className="w-6 h-6 text-white" />
      </div>
    </div>
  )
}
