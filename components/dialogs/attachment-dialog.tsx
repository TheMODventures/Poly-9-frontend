"use client";

import { useState, useRef, ChangeEvent } from "react";
import {Dialog,DialogTrigger,DialogContent, DialogTitle,} from "@/components/ui/dialog";
import { X, Paperclip } from "lucide-react";
import { PiCloudCheck } from "react-icons/pi";
import { UploadFile } from "@/interfaces/interface";

export default function AttachmentDialog() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected: UploadFile[] = Array.from(e.target.files).map((f) => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: f.size,
      uploaded: 0,
      status: "uploading",
    }));
    setFiles((p) => [...p, ...selected]);
    selected.forEach((f) => simulateUpload(f.id, f.size));
  };

  const simulateUpload = (id: number, size: number) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                uploaded: Math.min(f.uploaded + size / 20, size),
                status:
                  f.uploaded + size / 20 >= size ? "completed" : "uploading",
              }
            : f
        )
      );
    }, 500);
    setTimeout(() => clearInterval(interval), 10000);
  };

  const removeFile = (id: number) => {
    setFiles((p) => p.filter((f) => f.id !== id));
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
              className="mt-3 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm"
            >
              Browse File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileSelect}
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
                  {Math.round(file.uploaded / 1024)} KB of{" "}
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
                      width: `${(file.uploaded / file.size) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => removeFile(file.id)}
                className="text-gray-400 hover:text-gray-600 ml-3"
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
