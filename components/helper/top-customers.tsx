"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomerCard from "./customer-card";
import { BuyerItem } from "@/interfaces/interface";
import { resolveImageUrl } from "@/utils/image";
import { useRouter } from "next/navigation";
import { saveChatPreviewItem } from "@/utils/helper";
import { useChatStore } from "@/store/chat.store";

interface TopCustomersProps {
  items: BuyerItem[];
}

export default function TopCustomers({ items }: TopCustomersProps) {
  const router = useRouter();
  const prepareSessionFromItem = useChatStore(
    (state) => state.prepareSessionFromItem
  );
  const setItem = useChatStore((state) => state.setItem);

  const handleCardClick = (item: BuyerItem) => {
    setItem(item);
    prepareSessionFromItem(item);
    saveChatPreviewItem(item);
    router.push(`/chat?buyerId=${item.buyer_id}&itemId=${item.item_id}`);
  };

  if (!items.length) {
    return null;
  }

  return (
    <div className="bg-gradient-to-tr from-purple-50 to-white p-6">
      <h4
        className="text-xl font-poppins text-center mb-6"
        style={{ fontWeight: "700" }}
      >
        Recently Generated Concepts
      </h4>

      <Carousel className="w-full scale-95">
        <CarouselContent className="-ml-2">
          {items.map((item) => {
            const primaryImage = item.generated_images?.[0]?.image_url;
            const resolvedImage =
              resolveImageUrl(primaryImage || "") || "/placeholder.svg";

            return (
              <CarouselItem
                key={item.item_id}
                className="p-0 scale-86 basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <CustomerCard
                  title={item.name}
                  subtitle={item.season || item.type}
                  image={resolvedImage}
                  onClick={() => handleCardClick(item)}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious className="-left-12" />
        <CarouselNext className="-right-8" />
      </Carousel>
    </div>
  );
}
