import BuyerProfileContent from "@/components/profile/buyer-profile-content"

interface BuyersProfileProps {
  searchParams: {
    buyerId?: string
  }
}

export default function BuyersProfile({ searchParams }: BuyersProfileProps) {
  const buyerId = searchParams?.buyerId

  return (
    <div className="h-screen p-10 mt-15">
      <div className="max-w-[110rem] mx-auto space-y-4">
        <BuyerProfileContent buyerId={buyerId} />
      </div>
    </div>
  )
}
