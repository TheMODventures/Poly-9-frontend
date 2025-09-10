"use client"

import { Product } from "@/interfaces/interface"
import { createContext, useContext, useState, type ReactNode } from "react"

interface ProductContextType {
  selectedProduct: Product | null
  setSelectedProduct: (product: Product | null) => void
  isPreviewMode: boolean
  openPreview: (product: Product) => void
  closePreview: () => void
  isChatOpen: boolean
  setIsChatOpen: (value: boolean) => void
  toggleChat: () => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const openPreview = (product: Product) => {
    setSelectedProduct(product)
    setIsPreviewMode(true)
  }
    const closePreview = () => {
    setSelectedProduct(null)
    setIsPreviewMode(false)
  }
  const toggleChat = () => {
    setIsChatOpen((prev) => !prev)
  }

  return (
    <ProductContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        isPreviewMode,
        openPreview,
        closePreview,
        isChatOpen,
        setIsChatOpen,
        toggleChat,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider")
  }
  return context
}
