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
  const selectVariation = useChatStore((state) => state.selectVariation);

  const hasVariations = variations.length > 0;
  const firstVariation = hasVariations ? variations[0] : null;

  useEffect(() => {
    if (!hasVariations) {
      if (selectedProduct?.id === PREVIEW_PRODUCT_ID) {
        closePreview();
      }
      return;
    }

    if (!firstVariation) {
      return;
    }

    const resolvedImage = resolveImageUrl(firstVariation.image_url);
    const shouldSelectFirst =
      !selectedVariationKey ||
      !variations.some((item) => item.s3_key === selectedVariationKey);

    if (shouldSelectFirst) {
      selectVariation(firstVariation.s3_key);
    }

    const previewProduct = {
      id: PREVIEW_PRODUCT_ID,
      name: "Generated Concept",
      brand: "LanguageGUI",
      price: "-",
      image: resolvedImage,
      description: firstVariation.style,
    };

    const needsUpdate =
      !selectedProduct ||
      selectedProduct.id !== PREVIEW_PRODUCT_ID ||
      selectedProduct.image !== previewProduct.image ||
      selectedProduct.description !== previewProduct.description;

    if (needsUpdate || !isPreviewMode) {
      openPreview(previewProduct);
    }
  }, [
    closePreview,
    firstVariation,
    hasVariations,
    isPreviewMode,
    openPreview,
    selectVariation,
    selectedProduct,
    selectedVariationKey,
    variations,
  ]);

  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (hasVariations) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [hasVariations]);

  if (!hasVariations) {
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
