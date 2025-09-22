'use client'
import { useRef, useState } from "react";
import { FileText, X } from "lucide-react";
import { useUploadFile } from "@/services/mutation/buyer.mutation";
import { FileUploadResponse } from "@/interfaces/interface";

interface UploadFileProps {
  onFileUploaded?: (fileData: FileUploadResponse) => void;
  onFileRemoved?: (fileData: FileUploadResponse) => void;
  uploadedFiles?: FileUploadResponse[];
}

export function UploadFile({ onFileUploaded, onFileRemoved, uploadedFiles = [] }: UploadFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadFileMutation = useUploadFile();
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    uploadFileMutation.mutate(file, {
      onSuccess: (data) => {
        onFileUploaded?.(data);
      }
    });
  };

  const handleRemoveFile = (fileToRemove: FileUploadResponse) => {
    onFileRemoved?.(fileToRemove);
  };

  return (
    <div className="w-full">
      {/* Uploaded files display above the box */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4 space-y-2">
          {uploadedFiles.map((file) => (
            <div key={file.file_id} className="p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-red-600 font-semibold text-xs">PDF</span>
                </div>
                <div>
                  <p className="text-gray-800 font-medium text-sm">{file.filename}</p>
                  <p className="text-gray-500 text-xs">File</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFile(file)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload box */}
      <div
        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 flex flex-col items-center justify-center gap-2"
        onClick={() => inputRef.current?.click()}
      >
        {uploadFileMutation.isPending ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 text-sm">Uploading...</p>
          </div>
        ) : (
          <>
            <div className="w-10 h-12 bg-gray-600 rounded flex flex-col items-center justify-center relative">
              <div className="w-6 h-0.5 bg-white rounded mb-1"></div>
              <div className="w-4 h-0.5 bg-white rounded mb-1"></div>
              <div className="w-6 h-0.5 bg-white rounded"></div>
            </div>
            
            <p className="text-gray-700 font-medium text-sm">
              Drag your file here or Select from your Device
            </p>
            
            <p className="text-gray-500 text-xs">
              File must be .csv, ppt, pdf or xlsx
            </p>
          </>
        )}
        
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.ppt,.pdf,.xlsx"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}