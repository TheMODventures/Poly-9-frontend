"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useProduct } from "@/context/product-context"
import ProductVariants from "./product-variants"

export default function ProductPreview() {
  const { selectedProduct } = useProduct()

  if (!selectedProduct) return null

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h1 className="text-2xl font-inter text-gray-900 mb-1" style={{ fontWeight: "500" }}>
          Modern Glam Coffee Table
        </h1>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-gray-50 rounded-2xl p-8 mb-6 flex items-center justify-center min-h-80">
          <Image
            src="/assets/chair1.svg"
            width={400}
            height={300}
            alt="Modern Glam Coffee Table"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Variants */}
        <ProductVariants
          variants={[
            { src: "/assets/chair2.svg", alt: "Table view 1" },
            { src: "/assets/chair1.svg", alt: "Table view 2" },
            { src: "/assets/chair.svg", alt: "Table view 3" },
          ]}
          onAdd={() => console.log("Add new variant clicked")}
        />

        <div className="mb-6">
          <h2 className="text-lg font-inter text-[#0E004D] mb-2" style={{ fontWeight: "600" }}>
            Round coffee table
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-inter text-gray-900" style={{ fontWeight: "600" }}>
              Description
            </h3>
            <Button variant="ghost" size="sm" className="p-1">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Button>
          </div>
          <p className="text-gray-500 font-inter leading-relaxed">
            The Swedish Designer Monica Forstar&apos;s Style Is Characterised By Her Enternal Love For New Materials And Beautiful Pure Shapes.
          </p>
        </div>
      </div>
    </div>
  )
}
