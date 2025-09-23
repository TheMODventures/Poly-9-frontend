import ChatHeader from "@/components/chats/chat-header";
import ChatSection from "@/components/chats/chat-section";
import CategorySection from "@/components/categories/category-section";
import { ProductProvider } from "@/context/product-context";

interface ChatPageProps {
  searchParams: {
    buyerId?: string | string[];
    itemId?: string | string[];
    autoQuery?: string | string[];
  };
}

const selectParam = (value?: string | string[]) => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export default function ChatPage({ searchParams }: ChatPageProps) {
  const buyerId = selectParam(searchParams?.buyerId);
  const itemId = selectParam(searchParams?.itemId);
  const autoQuery = selectParam(searchParams?.autoQuery);

  return (
    <ProductProvider>
      <div className="h-screen flex w-full flex-col p-16 gap-6">
        <ChatHeader />
        <div className="flex-1 flex w-full gap-6">
          <ChatSection
            initialBuyerId={buyerId}
            initialItemId={itemId}
            autoQuery={autoQuery}
          />
          <CategorySection />
        </div>
      </div>
    </ProductProvider>
  );
}
