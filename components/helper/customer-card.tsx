"use client";

import { useCallback, type KeyboardEvent, type MouseEvent } from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { CgSoftwareUpload } from "react-icons/cg";

interface CustomerCardProps {
  title: string;
  image: string;
  subtitle?: string;
  onClick?: () => void;
}

export default function CustomerCard({
  title,
  image,
  onClick,
}: CustomerCardProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!onClick) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    },
    [onClick]
  );

  const handleActionButtonClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <h3 className="absolute top-3 left-3 text-lg font-semibold text-gray-800 z-10">
        {title}
      </h3>

      <div className="absolute top-3 right-3 flex space-x-2 z-10">
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
          onClick={handleActionButtonClick}
        >
          <CgSoftwareUpload size={20} />
        </button>
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-black cursor-pointer text-white flex items-center justify-center"
          onClick={onClick}
        >
          <Pencil size={16} />
        </button>
      </div>

      <div className="relative w-full h-64">
        <Image
          src={image}
          alt={title}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center space-y-2 z-10">
        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
        <span className="w-3 h-3 rounded-full bg-gray-400"></span>
      </div>
    </div>
  );
}
