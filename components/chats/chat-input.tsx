"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, Send } from "lucide-react";
import CreateProduct from "@/components/forms/create-product/create.form";
import AttachmentDialog from "@/components/dialogs/attachment-dialog";
import { usePathname } from "next/navigation";
import CreatePricingModal from "../dialogs/create-price";
import Image from "next/image";

export default function ChatInput() {
  const pathname = usePathname();
  const isContextFile = pathname === "/context-file";

  return (
    <div className="p-4">
      {!isContextFile && (<>
        <div className="mb-3 flex gap-1 items-center justify-center scale-94">
          <CreateProduct
            trigger={
              <Button className="bg-[#8cd1ff] border border-blue-800 hover:bg-blue-400 text-black text-xs px-1 py-2 h-8">
                <Image src="/assets/editbox.svg" alt="Edit Box" width={20} height={20} />
                 Create product
              </Button>
            }
          />
          <CreateProduct
            trigger={
              <Button className="bg-[#8cd1ff] border border-blue-800 hover:bg-blue-400 text-black text-xs px-1 py-2 h-8">
                <Image src="/assets/fileadd.svg" alt="File Add" width={20} height={20} />
                 Create Collection
              </Button>
            }
          />
          <CreatePricingModal />
        </div>
      </>)}

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4">
        <textarea
          placeholder="How can I help you?"
          className="w-full border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400 text-base min-h-[80px] outline-none"
        />
        <hr className="my-3 border-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AttachmentDialog />

            <button className="text-gray-500 hover:text-gray-700">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Send className="w-4 h-4 mr-2" />
            Send message
          </Button>
        </div>
      </div>
    </div>
  );
}
