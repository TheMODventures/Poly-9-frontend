import { Button } from "@/components/ui/button"
import { categories } from "@/utils/links"

export default function CategoryTabs() {
  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={category.active ? "default" : "outline"}
          className={`flex items-center gap-2 text-sm px-3 py-2 h-8 ${
            category.active
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {category.icon}
          {category.name}
        </Button>
      ))}
    </div>
  )
}
