"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { ImageIcon, Send } from "lucide-react";
import CreateProduct from "@/components/forms/create-product/create.form";
import AttachmentDialog from "@/components/dialogs/attachment-dialog";
import { usePathname } from "next/navigation";
import CreatePricingModal from "../dialogs/create-price";
import Image from "next/image";
import { useChatStore } from "@/store/chat.store";
import { useAuthUser } from "@/store/auth.store";

export default function ChatInput() {
  const pathname = usePathname();
  const isContextFile = pathname === "/context-file";
  const [message, setMessage] = useState("");
  const authUser = useAuthUser();
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearError = useChatStore((state) => state.clearError);

  const resetMessage = () => {
    setMessage("");
  };

  const dispatchMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed || isLoading) {
      return;
    }
    await sendMessage(trimmed, authUser?.name);
    resetMessage();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatchMessage();
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      await dispatchMessage();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (error) {
      clearError();
    }
    setMessage(event.target.value);
  };

  const isDisabled = isLoading || !message.trim();

  return (
    <div className="p-4">
      {!isContextFile && (
        <>
          <div className="mb-3 flex gap-1 items-center justify-center scale-94">
            <CreateProduct
              variant="product"
              trigger={
                <Button className="bg-[#8cd1ff] border border-blue-800 hover:bg-blue-400 text-black text-xs px-1 py-2 h-8">
                  <Image
                    src="/assets/editbox.svg"
                    alt="Edit Box"
                    width={20}
                    height={20}
                  />
                  Create product
                </Button>
              }
            />
            <CreateProduct
              variant="collection"
              trigger={
                <Button className="bg-[#8cd1ff] border border-blue-800 hover:bg-blue-400 text-black text-xs px-1 py-2 h-8">
                  <Image
                    src="/assets/fileadd.svg"
                    alt="File Add"
                    width={20}
                    height={20}
                  />
                  Create Collection
                </Button>
              }
            />
            <CreatePricingModal />
          </div>
        </>
      )}

      <form
        onSubmit={handleSubmit}
        className={`bg-white rounded-2xl shadow-md border ${
          error ? "border-red-300" : "border-gray-100"
        } p-4`}
      >
        <textarea
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="How can I help you?"
          className="w-full border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400 text-base min-h-[80px] outline-none"
        />
        <hr className="my-3 border-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AttachmentDialog />

            <button type="button" className="text-gray-500 hover:text-gray-700">
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          <Button
            type="submit"
            disabled={isDisabled}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-200 disabled:text-gray-500 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? "Sending" : "Send message"}
          </Button>
        </div>
      </form>
    </div>
  );
}
