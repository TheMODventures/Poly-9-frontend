
"use client";

import { useEffect } from "react";
import BuyersInfo from "@/components/helper/buyers-info";
import BuyersTable from "@/components/tables/buyers.table";
import { useListBuyers } from "@/services/mutation/buyer.mutation";

export default function Home() {
  const listBuyersMutation = useListBuyers();

  useEffect(() => {
    // Fetch buyers on component mount
    listBuyersMutation.mutate({ page: 1, limit: 10 });
  }, []);

  return (
    <div className="w-full h-full">
      <div className="px-6 mt-6">
        <BuyersInfo/>
      </div>
      <div className="px-6">
        <BuyersTable />
      </div>
    </div>
  );
}