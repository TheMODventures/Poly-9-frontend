"use client"

import Image from "next/image"
import { Plus } from "lucide-react"

interface ProductVariant {
  key: string
  imageUrl: string
  label?: string
  isSelected: boolean
}

interface ProductVariantsProps {
  variants: ProductVariant[]
  onSelect: (variantKey: string) => void
  onAdd?: () => void
  isAddDisabled?: boolean
}

export default function ProductVariants({ variants, onSelect, onAdd, isAddDisabled }: ProductVariantsProps) {
  return (
    <div className="flex gap-4 mb-6">
      {variants.map((variant) => (
        <button
          key={variant.key}
          type="button"
          onClick={() => onSelect(variant.key)}
          className={`relative w-20 h-16 rounded-lg overflow-hidden border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
            variant.isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-transparent"
          }`}
          title={variant.label}
        >
          <Image
            src={variant.imageUrl}
            alt={variant.label ?? "Product variation"}
            fill
            sizes="80px"
            className="object-cover"
            unoptimized={variant.imageUrl.startsWith("http")}
          />
        </button>
      ))}

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          disabled={isAddDisabled}
          className={`w-20 h-16 bg-blue-500 rounded-lg flex items-center justify-center transition-colors ${
            isAddDisabled
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
        >
          <Plus className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  )
}
