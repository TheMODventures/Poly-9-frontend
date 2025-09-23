import BuyerProfileContent from "@/components/profile/buyer-profile-content";
interface BuyersProfileProps {
  searchParams: {
    buyerId?: string;
  };
}
export default function BuyersProfile({ searchParams }: BuyersProfileProps) {
  const buyerId = searchParams?.buyerId;

  return (
    <div className="h-screen w-full p-10 mt-10">
      <BuyerProfileContent buyerId={buyerId} />
    </div>
  );
}
