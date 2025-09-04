
import BuyersInfo from "@/components/helper/buyers-info";
import ContextSection from "@/components/helper/context-section";

export default function ContextFilePage() {
  return (
    <div className="w-full h-full">
      <div className="px-6 mt-4">
        <BuyersInfo/>
      </div>
      <div className="px-6">
        <ContextSection />
      </div>
    </div>
  );
}