import ProfileHeader from "@/components/helper/profile-header"
import TabsSection from "@/components/helper/tabs-section"

export default function BuyersProfile() {
  return (
    <div className="h-screen p-10 mt-15">
      <div className="max-w-[110rem] mx-auto space-y-8">
        <ProfileHeader />
        <TabsSection />
      </div>
    </div>
  )
}
