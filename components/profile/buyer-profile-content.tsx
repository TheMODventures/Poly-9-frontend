"use client"

import ProfileHeader from "@/components/helper/profile-header"
import TabsSection from "@/components/helper/tabs-section"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorState } from "@/components/ui/error-state"
import { useBuyerById } from "@/services/query"

interface BuyerProfileContentProps {
  buyerId?: string
}

export default function BuyerProfileContent({ buyerId }: BuyerProfileContentProps) {
  const { data: buyer, isLoading, isError, error, refetch } = useBuyerById(buyerId)

  if (!buyerId) {
    return (
      <EmptyState
        title="Select a buyer"
        message="Choose a buyer from the table to see their profile and generated items."
        className="h-[60vh]"
      />
    )
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load buyer"
        message={error?.message || "Unable to load the buyer profile. Please try again."}
        onRetry={refetch}
        className="h-[60vh]"
      />
    )
  }

  return (
    <div className="space-y-4">
      <ProfileHeader buyer={buyer} isLoading={isLoading} />
      <TabsSection buyerId={buyerId} />
    </div>
  )
}
