"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown, MoreVertical } from "lucide-react"
import { colors, bases, brands } from "@/utils/constant"

interface TransformDialogProps {
  children: React.ReactNode
}

export default function TransformDialog({ children }: TransformDialogProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>(["Green"])
  const [selectedBase, setSelectedBase] = useState<string>("Brushed Brass")
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Partex"])
  const [priceRange, setPriceRange] = useState<[number, number]>([256, 25973])
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  
  const sliderRef = useRef<HTMLDivElement>(null)
  const minPrice = 0
  const maxPrice = 26000


  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) => (prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]))
  }

  const toggleBrand = (brandName: string) => {
    setSelectedBrands((prev) => (prev.includes(brandName) ? prev.filter((b) => b !== brandName) : [...prev, brandName]))
  }

  const getPercentage = (value: number) => ((value - minPrice) / (maxPrice - minPrice)) * 100

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const value = Math.round((percentage / 100) * (maxPrice - minPrice) + minPrice)

    setPriceRange(prev => {
      if (isDragging === 'min') {
        return [Math.min(value, prev[1] - 100), prev[1]]
      } else {
        return [prev[0], Math.max(value, prev[0] + 100)]
      }
    })
  }, [isDragging, maxPrice, minPrice])

  const handleMouseUp = useCallback(() => {
    setIsDragging(null)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false} className="max-w-md p-0 gap-0">
        <DialogHeader className="p-4 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium text-blue-600">Transform</DialogTitle>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-4 pb-4 space-y-4 mt-4">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="specification" className="border-0">
              <AccordionTrigger className="bg-gray-50 px-4 py-3 rounded-lg hover:no-underline [&[data-state=open]>svg]:rotate-180">
                <span className="text-sm font-medium text-gray-700">Product Specification</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 text-sm text-gray-600 leading-relaxed">
                The Swedish Designer Monica Forstar&apos;s Style Is Characterised By Her Enternal Love For New Materials And
                Beautiful Pure Shapes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="color" className="border-0">
              <AccordionTrigger className="bg-gray-50 px-4 py-3 rounded-lg hover:no-underline mt-3 [&[data-state=open]>svg]:rotate-180">
                <span className="text-sm font-medium text-gray-700">Color</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="flex gap-3">
                  {colors.map((color) => (
                    <div key={color.name} className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
                          selectedColors.includes(color.name) ? "border-gray-800" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => toggleColor(color.name)}
                      />
                      <span className="text-sm text-gray-700">{color.name}</span>
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="base" className="border-0">
              <AccordionTrigger className="bg-gray-50 px-4 py-3 rounded-lg hover:no-underline mt-3 [&[data-state=open]>svg]:rotate-180">
                <span className="text-sm font-medium text-gray-700">Base</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3">
                <div className="flex gap-2">
                  {bases.map((base, index) => (
                    <div key={index} className="text-center">
                      <div
                        className={`w-12 h-12 rounded cursor-pointer border-2 ${
                          selectedBase === base.name ? "border-blue-500" : "border-gray-200"
                        }`}
                        style={{ backgroundColor: base.color }}
                        onClick={() => setSelectedBase(base.name)}
                      />
                      <span className="text-xs text-gray-600 mt-1 block leading-tight">{base.name}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Brand</h3>
              <Button variant="link" className="text-blue-600 text-sm p-0 h-auto">
                View all
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {brands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrands.includes(brand) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${
                    selectedBrands.includes(brand)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-gray-600 border-gray-300"
                  }`}
                  onClick={() => toggleBrand(brand)}
                >
                  {brand}
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
            <div className="px-2">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>${priceRange[0].toLocaleString()}</span>
                <span>${priceRange[1].toLocaleString()}</span>
              </div>
              <div className="relative" ref={sliderRef}>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full absolute"
                    style={{
                      left: `${getPercentage(priceRange[0])}%`,
                      width: `${getPercentage(priceRange[1]) - getPercentage(priceRange[0])}%`,
                    }}
                  />
                </div>
                {/* Min handle */}
                <div
                  className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow cursor-pointer -top-1"
                  style={{ left: `calc(${getPercentage(priceRange[0])}% - 8px)` }}
                  onMouseDown={handleMouseDown('min')}
                />
                {/* Max handle */}
                <div
                  className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow cursor-pointer -top-1"
                  style={{ left: `calc(${getPercentage(priceRange[1])}% - 8px)` }}
                  onMouseDown={handleMouseDown('max')}
                />
              </div>
            </div>
          </div>
        
        <DialogClose asChild>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Apply Changes
          </Button>
        </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
