'use client'
import { useRef, useState } from "react";
import { FileText } from "lucide-react";

export function UploadFile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setLoading(true);
    setTimeout(() => {
      console.log("File uploaded successfully!");
      setUploadedFile(file.name);
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-all duration-200 flex flex-col items-center justify-center gap-2"
      onClick={() => inputRef.current?.click()}
    >
      {loading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <p className="text-gray-600 text-sm">Uploading...</p>
        </div>
      ) : uploadedFile ? (
        <div className="flex flex-col items-center gap-2">
          <FileText className="w-8 h-8 text-green-500" />
          <p className="text-gray-700 text-sm font-medium">{uploadedFile}</p>
          <p className="text-green-600 text-xs">File uploaded successfully</p>
        </div>
      ) : (
        <>
          <div className="w-10 h-12 bg-gray-600 rounded flex flex-col items-center justify-center relative">
            <div className="w-6 h-0.5 bg-white rounded mb-1"></div>
            <div className="w-4 h-0.5 bg-white rounded mb-1"></div>
            <div className="w-6 h-0.5 bg-white rounded"></div>
          </div>
          
          <p className="text-gray-700 font-medium text-sm">
            Drag your file here
          </p>
          
          <p className="text-gray-500 text-xs">
            file must be .csv or xlsx
          </p>
        </>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}