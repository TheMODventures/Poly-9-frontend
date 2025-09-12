"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { pricingItems } from "@/data/mock-data";
import Image from "next/image";

export default function CreatePricingModal() {

  const totalPrice = pricingItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#8cd1ff] border border-blue-800 hover:bg-blue-400 text-black text-xs px-2 py-2 h-8">
          <Image src="/assets/qouta.svg" alt="Message" width={20} height={20} />
          Create pricing
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-inter text-gray-900 font-bold">Pricing breakdown</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1 space-y-6 py-4">
          {pricingItems.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900 text-base">{item.category}</h3>
                <span className="text-blue-600 font-semibold text-lg">${item.price}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-gray-600"><span className="text-gray-900">Part No:</span> {item.partNo}</div>
                  <div className="text-gray-600"><span className="text-gray-900">Material No:</span> {item.materialNo}</div>
                </div>
                <div className="text-right text-gray-600 text-xs">
                  Source<br />{item.source}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total price</span>
          <span className="text-xl font-bold text-gray-900">${totalPrice}</span>
        </div>

        <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg">
          Generate Quote
        </Button>
      </DialogContent>
    </Dialog>
  );
}
