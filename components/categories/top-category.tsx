import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function TopCategories() {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Top Collections</h3>
      <div className="space-x-3 flex">
        <div className="relative rounded-lg overflow-hidden h-38 bg-gradient-to-r from-slate-600 to-slate-500">
          <Image src="/assets/sofa1.svg" width={400} height={400}  alt="Collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-opacity-30 flex flex-col justify-between p-3">
            <div>
              <h4 className="text-white font-medium text-sm">Collection</h4>
              <p className="text-white text-xs opacity-90">For a cozy yellow sofa</p>
            </div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-6 self-start">
              Learn More
            </Button>
          </div>
        </div>
        <div className="relative rounded-lg overflow-hidden h-38 bg-gradient-to-r from-gray-400 to-gray-300">
          <Image src="/assets/sofa2.svg" width={400} height={400}  alt="Collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-opacity-30 flex flex-col justify-between p-3">
            <div>
              <h4 className="text-white font-medium text-sm">Collection</h4>
              <p className="text-white text-xs opacity-90">For a cozy yellow sofa</p>
            </div>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 h-6 self-start">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  )
}
