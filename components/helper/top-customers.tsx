"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import CustomerCard from "./customer-card"
import { customers } from "@/data/mock-data"

export default function TopCustomers() {
  return (
    <div className="bg-gradient-to-tr from-white via-purple-50 to-blue-100 p-6">
      <h3 className="text-lg font-semibold text-center mb-6">Top customers</h3>

      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {customers.map((customer, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/3 lg:basis-1/5">
              <CustomerCard {...customer} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-8" />
        <CarouselNext className="-right-8" />
      </Carousel>

      <div className="flex justify-center mt-4 gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
      </div>
    </div>
  )
}
