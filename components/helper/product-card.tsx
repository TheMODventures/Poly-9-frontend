"use client";

import { useCallback, type KeyboardEvent, type MouseEvent } from "react";
import Image from "next/image";
import { Pencil } from "lucide-react";

interface ProductCardProps {
  name: string
  price?: number
  originalPrice?: number
  image: string
  // badge?: "NEW" | "SALE" | null
  variants?: string[]
  onClick?: () => void
}

export default function ProductCard({ name, image, variants, onClick }: ProductCardProps) {
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

  const handleActionButtonClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  }, []);

  return (
    <div
      className={`flex flex-col items-center rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        onClick ? "cursor-pointer" : ""
      }`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div className="relative w-full bg-white rounded-2xl hover:shadow-xl transition-shadow duration-300 shadow-sm border overflow-hidden">
        <div className="relative w-full h-54 spect-square flex items-center justify-center">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={300}
            height={300}
            unoptimized
            className="object-cover"
          />
        </div>

        <button
          type="button"
          className="absolute top-2 right-2 bg-black text-white w-7 h-7 rounded-full flex items-center justify-center"
          onClick={handleActionButtonClick}
        >
          <Pencil size={14} />
        </button>
      </div>

      <h4 className="mt-2 text-blue-600 font-medium text-sm text-center">{name}</h4>

      {variants && variants.length > 0 && (
        <div className="flex items-center justify-center space-x-2 mt-1">
          {variants.map((color, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-full border"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
