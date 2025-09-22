import ChatHeader from "@/components/chats/chat-header";
import ChatSection from "@/components/chats/chat-section";
import CategorySection from "@/components/categories/category-section";
import { ProductProvider } from "@/context/product-context";

export default function ChatPage() {
  return (
    <ProductProvider>
      <div className="h-screen flex w-full flex-col p-16 gap-6">
        <ChatHeader />
        <div className="flex-1 flex w-full gap-6">
          <ChatSection />
          <CategorySection />
        </div>
      </div>
    </ProductProvider>
  );
}
