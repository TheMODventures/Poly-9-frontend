"use client";

import { useRouter } from "next/navigation";
import ProductCard from "./product-card";
import { BuyerItem } from "@/interfaces/interface";
import { resolveImageUrl } from "@/utils/image";
import { saveChatPreviewItem } from "@/utils/helper";
import { useChatStore } from "@/store/chat.store";

interface BestsellersProps {
  items: BuyerItem[]
}

export default function Bestsellers({ items }: BestsellersProps) {
  const router = useRouter();
  const prepareSessionFromItem = useChatStore(
    (state) => state.prepareSessionFromItem
  );

  const handleCardClick = (item: BuyerItem) => {
    prepareSessionFromItem(item);
    saveChatPreviewItem(item);
    router.push(`/chat?buyerId=${item.buyer_id}&itemId=${item.item_id}`);
  };

  if (!items.length) {
    return null
  }

  return (
    <div className="bg-gradient-to-tr from-blue-50 via-purple-50 to-white p-4">
      <div className="flex items-center justify-between mb-6 p-2">
        <h3 className="text-2xl ml-2 font-poppins" style={{ fontWeight: "600" }}>
          Buyer Items
        </h3>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">
          View all
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map((item) => {
          const primaryImage = item.generated_images?.[0]?.image_url
          const image = resolveImageUrl(primaryImage || "") || "/placeholder.svg"

          return (
            <ProductCard
              key={item.item_id}
              name={item.name}
              image={image}
              onClick={() => handleCardClick(item)}
            />
          )
        })}
      </div>
    </div>
  )
}
