import { Plus } from "lucide-react"
import Image from "next/image"

const collectionItems = [
  { id: 1, image: "/assets/chair1.svg", type: "chair" },
  { id: 2, image: "/assets/sofa2.svg", type: "room" },
  { id: 3, image: "/assets/sofa1.svg", type: "armchair" },
  { id: 4, image: "/assets/chair2.svg", type: "view" },
  { id: 5, image: "/assets/chair.png", type: "room" },
]

export default function CollectionGrid() {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-2xl font-inter text-gray-900 mb-1" style={{fontWeight:"500"}}>Collection Details</h2>
      </div>
      
      <div className="flex gap-4 mb-8">
        {collectionItems.map((item) => (
          <div key={item.id} className="relative">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                width={80}
                height={80}
                alt="Collection item"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
        
        <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
          <Plus className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  )
}