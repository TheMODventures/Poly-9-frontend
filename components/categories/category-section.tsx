"use client";
import { useEffect, useState } from "react";
import CollectionsHeader from "./category-header";
import ProductPreview from "./product-preview";
import TransformProduct from "./transform-product";
import { useProduct } from "@/context/product-context";
import { useChatStore } from "@/store/chat.store";
import { resolveImageUrl } from "@/utils/image";
const PREVIEW_PRODUCT_ID = "chat-preview";

export default function CategorySection() {
  const {
    isPreviewMode,
    isChatOpen,
    openPreview,
    closePreview,
    selectedProduct,
  } = useProduct();
  const selectedVariationKey = useChatStore(
    (state) => state.selectedVariationKey
  );
  const variations = useChatStore((state) => state.imageVariations);
  const previewProduct = useChatStore((state) => state.previewProduct);
  const selectVariation = useChatStore((state) => state.selectVariation);

  const hasVariations = variations.length > 0;
  const firstVariation = hasVariations ? variations[0] : null;

  useEffect(() => {
    if (!hasVariations || !firstVariation) {
      return;
    }

    const shouldSelectFirst =
      !selectedVariationKey ||
      !variations.some((item) => item.s3_key === selectedVariationKey);

    if (shouldSelectFirst) {
      selectVariation(firstVariation.s3_key);
    }
  }, [
    firstVariation,
    hasVariations,
    selectVariation,
    selectedVariationKey,
    variations,
  ]);

  useEffect(() => {
    const fallbackPreview = firstVariation
      ? {
          id: PREVIEW_PRODUCT_ID,
          name: "Generated Concept",
          brand: "LanguageGUI",
          price: "-",
          image: resolveImageUrl(firstVariation.image_url),
          description: firstVariation.style,
        }
      : null;

    const previewToShow = previewProduct
      ? {
          ...previewProduct,
          description:
            previewProduct.description || fallbackPreview?.description || "",
          image: previewProduct.image || fallbackPreview?.image || "",
        }
      : fallbackPreview;

    if (!previewToShow) {
      if (selectedProduct) {
        closePreview();
      }
      return;
    }

    const needsUpdate =
      !selectedProduct ||
      selectedProduct.id !== previewToShow.id ||
      selectedProduct.name !== previewToShow.name ||
      selectedProduct.image !== previewToShow.image ||
      selectedProduct.description !== previewToShow.description ||
      selectedProduct.brand !== previewToShow.brand;

    if (needsUpdate || !isPreviewMode) {
      openPreview(previewToShow);
    }
  }, [
    closePreview,
    firstVariation,
    isPreviewMode,
    openPreview,
    previewProduct,
    selectedProduct,
  ]);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (hasVariations || previewProduct) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [hasVariations, previewProduct]);

  if (!hasVariations && !previewProduct) {
    return null;
  }

  const containerClasses = `bg-white flex flex-col transform transition-all duration-500 ease-out ${
    isChatOpen ? "w-2/3" : "w-full"
  } ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

  return (
    <div className={containerClasses}>
      <CollectionsHeader />
      <div className="flex flex-1 overflow-hidden gap-8">
        <ProductPreview />
        <TransformProduct />
      </div>
    </div>
  );
}
