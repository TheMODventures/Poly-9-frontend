"use client";

import Image from "next/image";
import { useProduct } from "@/context/product-context";
import ProductVariants from "./product-variants";
import { MdEdit } from "react-icons/md";
import { useChatStore } from "@/store/chat.store";
import { resolveImageUrl } from "@/utils/image";

export default function ProductPreview() {
  const { selectedProduct } = useProduct();
  const variations = useChatStore((state) => state.imageVariations);
  const selectedVariationKey = useChatStore(
    (state) => state.selectedVariationKey
  );
  const selectedStyle = useChatStore((state) => state.selectedStyle);
  const selectVariation = useChatStore((state) => state.selectVariation);

  if (!selectedProduct) return null;

  const normalizedVariations =
    variations.length &&
    variations.map((variant) => ({
      key: variant.s3_key,
      imageUrl: resolveImageUrl(variant.image_url),
      label: variant.style,
      isSelected: variant.s3_key === selectedVariationKey,
    }));

  const selectedVariant = variations.length
    ? variations.find((variant) => variant.s3_key === selectedVariationKey) ??
      variations[0]
    : null;

  const previewImage = selectedVariant
    ? resolveImageUrl(selectedVariant.image_url)
    : selectedProduct.image;

  const description =
    selectedStyle || selectedProduct.description || "No description available.";

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <h1
          className="text-2xl font-inter text-gray-900 mb-1"
          style={{ fontWeight: "500" }}
        >
          {selectedProduct.name}
        </h1>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-gray-50 rounded-2xl p-8 mb-6 flex items-center justify-center min-h-80">
          <Image
            src={previewImage}
            width={400}
            height={300}
            alt={selectedVariant?.style ?? selectedProduct.name}
            className="w-full max-w-md h-auto object-contain"
            unoptimized={previewImage?.startsWith("http")}
          />
        </div>

        <ProductVariants
          variants={normalizedVariations.map((variant, index) => ({
            ...variant,
            isSelected:
              variant.isSelected || (!variations.length && index === 0),
          }))}
          onSelect={(variantKey) => selectVariation(variantKey)}
          onAdd={() => console.log("Add new variant clicked")}
        />

        <div className="mb-6">
          <h2
            className="text-lg font-inter text-[#0E004D] mb-2"
            style={{ fontWeight: "600" }}
          >
            {selectedProduct.brand}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3
              className="text-xl font-inter text-gray-900"
              style={{ fontWeight: "600" }}
            >
              Description
            </h3>
            <MdEdit className="w-5 h-5 text-gray-700 cursor-pointer hover:text-gray-600" />
          </div>
          <div className="text-gray-500 font-inter leading-relaxed space-y-3">
            {description
              .split(/\n{2,}/)
              .filter((paragraph) => paragraph.trim().length > 0)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
