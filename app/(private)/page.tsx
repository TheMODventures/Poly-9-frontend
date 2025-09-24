
"use client";

import BuyersInfo from "@/components/helper/buyers-info";
import BuyersTable from "@/components/tables/buyers.table";
import { useListBuyers } from "@/services/query";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function HomeContent() {
  const searchParams = useSearchParams();
  const { data, isLoading, isError, error, refetch } = useListBuyers({
    page: 1,
    limit: 10,
    search: searchParams.get("q") || undefined,
  });

  return (
    <div className="w-full h-full">
      <div className="px-6 mt-6">
        <BuyersInfo buyersData={data} />
      </div>
      <div className="px-6">
        <BuyersTable 
          buyersData={data}
          isLoading={isLoading}
          isError={isError}
          error={error}
          refetch={refetch}
        />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}