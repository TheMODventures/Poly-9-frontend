import { AddBuyerFormValues } from "@/components/forms/buyers/add-modal/add.validation";
import { setCookie, deleteCookie } from "cookies-next/client";
import { ControllerRenderProps } from "react-hook-form";
import type { BuyerItem, FormContentConfig } from "@/interfaces/interface";
import React from "react";
import { SOCIAL_OPTIONS } from "@/utils/social.constants";

export const getAccessToken = () => {
  const accessToken = localStorage.getItem("access-token");
  return accessToken;
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("access-token", token);
  setCookie("access-token", token);
};

export const removeAccessToken = () => {
  try {
    localStorage.removeItem("access-token");
  } catch {}
  try {
    deleteCookie("access-token");
  } catch {}
};

export const toggleSocial = (
  field: ControllerRenderProps<AddBuyerFormValues, "socials">,
  social: string
) => {
  field.onChange(
    field.value?.some((s) => s.name === social)
      ? field.value.filter((s) => s.name !== social)
      : [...(field.value || []), { name: social, url: "" }]
  );
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
};

export const getFormContent = (
  variant: "collection" | "product"
): FormContentConfig => {
  if (variant === "collection") {
    return {
      title: "Create New Collection",
      subtitle:
        "Lets create a new product collection. I've prepared a few questions to help get started",
      nameLabel: "Whats your collection name?",
      seasonLabel: "Which season is the collection for?",
      styleLabel: "What style should it include?",
      countLabel: "How many products should be in the collection?",
    };
  } else {
    return {
      title: "Create New Product",
      subtitle:
        "Lets create a new product. I've prepared a few questions to help get started",
      nameLabel: "Whats your product name?",
      seasonLabel: "Which season is the product for?",
      styleLabel: "What style should it include?",
      countLabel: "How many products should be in the collection?",
    };
  }
};

import { UseFormSetValue } from "react-hook-form";
import { CreateProductFormValues } from "@/components/forms/create-product/create.validation";

export function createStyleHandlers(
  watchedStyles: string[],
  setValue: UseFormSetValue<CreateProductFormValues>,
  setNewStyle: React.Dispatch<React.SetStateAction<string>>
) {
  const addStyle = (style: string) => {
    const normalized = style.trim();
    if (normalized && !watchedStyles.includes(normalized)) {
      setValue("styles", [...watchedStyles, normalized]);
      setNewStyle("");
    }
  };

  const removeStyle = (style: string) => {
    setValue(
      "styles",
      watchedStyles.filter((s) => s !== style)
    );
  };

  return { addStyle, removeStyle };
}

export function formatTime(timestamp: string) {
  try {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "2:45 PM";
  }
}

export function getChatWidthClasses(isOpen: boolean, hasVariations: boolean) {
  if (!isOpen) {
    return "w-16 shrink-0 flex-none";
  }
  if (hasVariations) {
    return "w-full lg:w-[42%] xl:w-[38%] 2xl:w-[33%] min-w-[320px] shrink-0 flex-none";
  }
  return "w-full grow";
}

export function buildItemGenerationPrompt({
  type,
  name,
  season,
  styles,
  targetImageCount,
}: {
  type: "collection" | "product";
  name: string;
  season: string;
  styles: string[];
  targetImageCount?: number;
}) {
  const trimmedName = name.trim();
  const trimmedSeason = season.trim();
  const normalizedStyles = styles.map((style) => style.trim()).filter(Boolean);
  const styleSentence = normalizedStyles.length
    ? `The ${
        normalizedStyles.length > 1 ? "styles are" : "style is"
      } ${normalizedStyles.join(", ")}.`
    : "";

  const baseSentence =
    type === "collection"
      ? `Take context from the buyer's context files and Generate images for the collection "${trimmedName}".`
      : `Take context from the buyer's context files and Generate images for the product "${trimmedName}".`;

  const seasonSentence = trimmedSeason ? `The season is ${trimmedSeason}.` : "";

  const targetSentence =
    type === "collection" && targetImageCount
      ? `Create ${targetImageCount} concept images.`
      : "";

  return [baseSentence, seasonSentence, styleSentence, targetSentence]
    .filter(Boolean)
    .join(" ")
    .trim();
}

export const CHAT_PREVIEW_STORAGE_KEY = "chat-preview-item";

export function saveChatPreviewItem(item: BuyerItem) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.setItem(CHAT_PREVIEW_STORAGE_KEY, JSON.stringify(item));
  } catch {
    // Ignore storage errors; preview just will not hydrate.
  }
}

export function loadChatPreviewItem(): BuyerItem | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(CHAT_PREVIEW_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as BuyerItem;
  } catch {
    return null;
  }
}

export function clearChatPreviewItem() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    sessionStorage.removeItem(CHAT_PREVIEW_STORAGE_KEY);
  } catch {
    // Ignore storage errors to avoid breaking UX.
  }
}
export const getSocialIcon = (socialName: string) => {
  const socialOption = SOCIAL_OPTIONS.find((option) => 
    option.value.toLowerCase() === socialName.toLowerCase()
  );
  return socialOption?.icon || null;
};

export const getSocialColor = (socialName: string) => {
  const socialOption = SOCIAL_OPTIONS.find(
    (option) => option.value.toLowerCase() === socialName.toLowerCase()
  );
  return socialOption?.color || "bg-gray-500";
};

export const getSocialHoverColor = (socialName: string) => {
  const socialOption = SOCIAL_OPTIONS.find(
    (option) => option.value.toLowerCase() === socialName.toLowerCase()
  );
  return socialOption?.hoverColor || "hover:bg-gray-600";
};

export const getSocialIconColor = (socialName: string) => {
  const socialOption = SOCIAL_OPTIONS.find(
    (option) => option.value.toLowerCase() === socialName.toLowerCase()
  );
  return socialOption?.iconColor || "text-white";
};
