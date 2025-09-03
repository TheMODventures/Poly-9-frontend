
import BuyersInfo from "@/components/helper/buyers-info";
import BuyersTable from "@/components/tables/buyers.table";

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="px-6 mt-4">
        <BuyersInfo/>
      </div>
      <div className="px-6">
        <BuyersTable />
      </div>
    </div>
  );
}