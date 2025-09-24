"use client";

import { useState, useRef, type ChangeEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Paperclip } from "lucide-react";
import { PiCloudCheck } from "react-icons/pi";
import { UploadFile } from "@/interfaces/interface";
import { useUploadDocument } from "@/services/mutation/document.mutation";
import { useChatStore } from "@/store/chat.store";
import { toast } from "sonner";

export default function AttachmentDialog() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const buyerId = useChatStore((state) => state.buyerId);
  const { mutateAsync: uploadDocument, isPending } = useUploadDocument();

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (isPending) {
      return;
    }

    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!buyerId) {
      toast.error("Select a buyer before uploading a document.");
      resetInput();
      return;
    }

    const tempId = Date.now();
    const fileEntry: UploadFile = {
      id: tempId,
      name: file.name,
      size: file.size,
      uploaded: 0,
      status: "uploading",
    };

    setFiles([fileEntry]);

    try {
      await uploadDocument({
        buyerId,
        file,
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total ?? file.size;
          const loaded = progressEvent.loaded ?? 0;
          const ratio = total > 0 ? loaded / total : 0;
          const uploadedBytes = Math.min(
            file.size,
            Math.round(ratio * file.size)
          );

          setFiles((prev) =>
            prev.map((item) =>
              item.id === tempId
                ? {
                    ...item,
                    uploaded: uploadedBytes,
                    status: ratio >= 1 ? "completed" : "uploading",
                  }
                : item
            )
          );
        },
      });

      setFiles((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? { ...item, uploaded: file.size, status: "completed" }
            : item
        )
      );
    } catch {
      setFiles([]);
      resetInput();
      return;
    }

    resetInput();
  };

  const removeFile = (id: number) => {
    setFiles((previous) => previous.filter((file) => file.id !== id));
    resetInput();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-gray-500 hover:text-gray-700">
          <Paperclip className="w-5 h-5" />
        </button>
      </DialogTrigger>

      <DialogContent className="p-0 rounded-xl shadow-xl border w-[380px] relative bottom-70 left-100">
        <div className="p-4 border-b flex items-center gap-2">
          <PiCloudCheck className="w-5 h-5 text-blue-500" />
          <div>
            <h2 className="font-medium text-gray-900">Upload files</h2>
            <p className="text-sm text-gray-600">
              Select and upload the files of your choice
            </p>
          </div>
        </div>
        <DialogTitle></DialogTitle>

        <div className="p-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="text-gray-400 mb-2">☁️</div>
            <p className="text-sm text-gray-600">
              Choose a file or drag & drop it here
            </p>
            <p className="text-xs text-gray-400">JPEG, PNG, up to 50 MB</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              type="button"
              disabled={isPending}
            >
              {isPending ? "Uploading…" : "Browse File"}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-2 px-4 pb-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  📄 {file.name}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(file.uploaded / 1024)} KB of {""}
                  {Math.round(file.size / 1024)} KB
                  {file.status === "uploading" && (
                    <span className="text-blue-500 ml-2">Uploading…</span>
                  )}
                  {file.status === "completed" && (
                    <span className="text-green-600 ml-2">Completed</span>
                  )}
                </div>
                <div className="w-full h-2 bg-gray-200 rounded mt-2">
                  <div
                    className={`h-2 rounded ${
                      file.status === "completed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        file.size
                          ? (file.uploaded / file.size) * 100
                          : 0
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="text-gray-400 hover:text-gray-600 ml-3"
                type="button"
                disabled={isPending}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
