"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CustomerCard from "./customer-card"
import { customers } from "@/data/mock-data"

interface RecentProductsProps {
  type: "collections" | "products"
}

export default function TopCustomers({ type }: RecentProductsProps) {
  return (
    <div className="bg-gradient-to-tr from-purple-50 to-white p-6">
      <h4 className="text-xl font-poppins text-center mb-6" style={{fontWeight:"700"}}>
        Recent {type.charAt(0).toUpperCase() + type.slice(1)}
      </h4>

      <Carousel className="w-full scale-95">
      <CarouselContent className="-ml-2">
        {customers.map((customer, index) => (
          <CarouselItem key={index} className="p-0 scale-86 basis-1/2 md:basis-1/3 lg:basis-1/4">
            <CustomerCard {...customer} />
          </CarouselItem>
        ))}
      </CarouselContent>

        <CarouselPrevious className="-left-12" />
        <CarouselNext className="-right-8" />
      </Carousel>
    </div>
  )
}
