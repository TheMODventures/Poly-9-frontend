'use client';

import { useCallback } from "react";
import { BsFileEarmarkCheckFill } from "react-icons/bs";
import { MdRefresh } from "react-icons/md";
import { PiDownloadSimple } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import ShareDialog from "../dialogs/share-dialog";
import { BiSolidEdit } from "react-icons/bi";
import { useProduct } from "@/context/product-context";
import { useChatStore } from "@/store/chat.store";
import { useDeleteBuyerItem } from "@/services/mutation/buyer.mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CollectionsHeader() {
  const router = useRouter();
  const { isPreviewMode, selectedProduct, closePreview } = useProduct();
  const buyerId = useChatStore((state) => state.buyerId);
  const itemId = useChatStore((state) => state.itemId);
  const setItemId = useChatStore((state) => state.setItemId);

  const { mutateAsync: deleteItem, isPending: isDeleting } = useDeleteBuyerItem();

  const handleDelete = useCallback(async () => {
    if (!itemId) {
      toast.error("No item selected to delete.");
      return;
    }

    if (!buyerId) {
      toast.error("Missing buyer information for deletion.");
      return;
    }

    try {
      await deleteItem({ item_id: itemId, buyer_id: buyerId });
      closePreview();
      setItemId(null);
      router.push(`/profile?buyerId=${buyerId}`);
    } catch {
      // Errors are handled globally via axios middleware, this catch keeps the function awaited.
    }
  }, [buyerId, closePreview, deleteItem, itemId, router, setItemId]);

  const title = selectedProduct?.name?.trim() || "Collection";

  return (
    <div className="bg-white px-6 py-4 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-inter text-gray-900 font-bold">
            {title}
          </h1>
          {isPreviewMode && <BiSolidEdit className="h-7 w-7 text-gray-600" />}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            type="button"
          >
            <MdRefresh className="h-5 w-5 text-gray-600" />
          </button>
          <button
            className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            type="button"
          >
            <BsFileEarmarkCheckFill className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={isDeleting || !itemId || !buyerId}
            type="button"
            aria-label="Delete item"
          >
            <RiDeleteBinLine className="w-5 h-5 text-gray-600" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            className="p-1 cursor-pointer border border-gray-400 rounded-lg hover:bg-gray-100 transition"
            type="button"
          >
            <PiDownloadSimple className="w-6 h-6 text-gray-600" />
          </button>

          <ShareDialog />
        </div>
      </div>
    </div>
  );
}
