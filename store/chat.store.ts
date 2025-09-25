import { create } from "zustand";
import { chatService } from "@/services/api/chat.api";
import type {
  ChatImageVariation,
  ChatRequestBody,
  ChatRole,
} from "@/services/interface/chat/chat.interface";
import type {
  BuyerItem,
  BuyerItemImage,
  Product,
} from "@/interfaces/interface";
import { resolveImageUrl } from "@/utils/image";

interface ChatMessageState {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  author: string;
  avatar?: string | null;
}

interface ChatStoreState {
  buyerId: string | null;
  itemId: string | null;
  messages: ChatMessageState[];
  imageVariations: ChatImageVariation[];
  selectedVariationKey: string | null;
  selectedStyle: string;
  previewProduct: Product | null;
  lastUserMessage: string | null;
  lastAssistantMessage: string | null;
  lastRequestBody: ChatRequestBody | null;
  isLoading: boolean;
  isGeneratingVariation: boolean;
  error: string | null;
  setBuyerId: (buyerId: string | null) => void;
  setItemId: (itemId: string | null) => void;
  setContext: (context: { buyerId: string | null; itemId: string | null }) => void;
  hydratePreviewFromItem: (item: BuyerItem) => void;
  prepareSessionFromItem: (item: BuyerItem) => void;
  clearPreview: () => void;
  resetSession: () => void;
  clearError: () => void;
  sendMessage: (query: string, authorName?: string) => Promise<void>;
  selectVariation: (variationKey: string) => void;
  generateAdditionalVariation: () => Promise<void>;
}

const DEFAULT_BUYER_ID = "6ec4a004-5b4c-42e6-b50c-a1592c9725ba";

function buildVariationKey(image: BuyerItemImage, index: number) {
  return (
    image.s3_key ||
    image.image_id ||
    (image.image_url ? `${image.image_url}-${index}` : `variation-${index}`)
  );
}

function normalizeVariationStyle(style?: string[] | string | null): string {
  if (Array.isArray(style)) {
    return style.join(", ");
  }
  if (typeof style === "string") {
    return style;
  }
  return "";
}

function mapImagesToVariations(images: BuyerItemImage[]): ChatImageVariation[] {
  return images
    .map((image, index) => ({
      image_url: image.image_url,
      s3_key: buildVariationKey(image, index),
      style: normalizeVariationStyle(image.style),
      variation: image.variation ?? index + 1,
    }))
    .filter((variation) => Boolean(variation.image_url));
}

function buildPreviewProduct(
  item: BuyerItem,
  variations: ChatImageVariation[]
): Product {
  const primaryVariation = variations[0];
  const fallbackImage = item.generated_images?.[0]?.image_url ?? "";
  const resolvedImage = resolveImageUrl(primaryVariation?.image_url ?? fallbackImage);
  const descriptionSource =
    item.description?.trim() ||
    normalizeVariationStyle(item.style) ||
    primaryVariation?.style ||
    "";

  return {
    id: item.item_id,
    name: item.name,
    brand: item.season || item.type || "LanguageGUI",
    price: "-",
    image: resolvedImage || primaryVariation?.image_url || fallbackImage,
    description: descriptionSource,
  };
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
  buyerId: null,
  itemId: null,
  messages: [],
  imageVariations: [],
  selectedVariationKey: null,
  selectedStyle: "",
  previewProduct: null,
  lastUserMessage: null,
  lastAssistantMessage: null,
  lastRequestBody: null,
  isLoading: false,
  isGeneratingVariation: false,
  error: null,
  setBuyerId: (buyerId) => set({ buyerId }),
  setItemId: (itemId) => set({ itemId }),
  setContext: ({ buyerId, itemId }) => set({ buyerId, itemId }),
  prepareSessionFromItem: (item) =>
    set(() => {
      const variations = mapImagesToVariations(item.generated_images || []);
      const previewProduct = buildPreviewProduct(item, variations);
      const primaryStyle = variations[0]?.style || previewProduct.description || "";

      return {
        buyerId: item.buyer_id || null,
        itemId: item.item_id || null,
        messages: [],
        imageVariations: variations,
        selectedVariationKey: variations[0]?.s3_key ?? null,
        selectedStyle: primaryStyle,
        previewProduct,
        lastUserMessage: null,
        lastAssistantMessage: null,
        lastRequestBody: null,
        isLoading: false,
        isGeneratingVariation: false,
        error: null,
      };
    }),
  hydratePreviewFromItem: (item) =>
    set((state) => {
      const variations = mapImagesToVariations(item.generated_images || []);
      const previewProduct = buildPreviewProduct(item, variations);
      const primaryStyle =
        variations[0]?.style || previewProduct.description || state.selectedStyle;

      return {
        previewProduct,
        imageVariations: variations,
        selectedVariationKey: variations[0]?.s3_key ?? state.selectedVariationKey,
        selectedStyle: primaryStyle,
        buyerId: item.buyer_id || state.buyerId,
        itemId: item.item_id || state.itemId,
      };
    }),
  clearPreview: () =>
    set({
      previewProduct: null,
      imageVariations: [],
      selectedVariationKey: null,
      selectedStyle: "",
    }),
  resetSession: () =>
    set({
      messages: [],
      imageVariations: [],
      selectedVariationKey: null,
      selectedStyle: "",
      previewProduct: null,
      lastUserMessage: null,
      lastAssistantMessage: null,
      isLoading: false,
      error: null,
    }),
  clearError: () => set({ error: null }),
  selectVariation: (variationKey) =>
    set((state) => {
      const variation = state.imageVariations.find(
        (item) => item.s3_key === variationKey
      );
      if (!variation) {
        return {};
      }

      return {
        selectedVariationKey: variation.s3_key,
        selectedStyle: variation.style,
      };
    }),
  generateAdditionalVariation: async () => {
    const state = get();

    if (state.isLoading || state.isGeneratingVariation) {
      return;
    }

    const baseRequest: ChatRequestBody | null = state.lastRequestBody
      ? { ...state.lastRequestBody }
      : state.lastUserMessage
        ? {
            query: state.lastUserMessage,
            buyer_id: state.buyerId ?? DEFAULT_BUYER_ID,
            chat_history:
              state.lastUserMessage && state.lastAssistantMessage
                ? [
                    { role: "user" as const, content: state.lastUserMessage },
                    {
                      role: "assistant" as const,
                      content: state.lastAssistantMessage,
                    },
                  ]
                : [],
            item_id: state.itemId ?? undefined,
          }
        : null;

    if (!baseRequest || !baseRequest.query.trim()) {
      return;
    }

    set({ isGeneratingVariation: true, error: null });

    try {
      const requestWithCount: ChatRequestBody = {
        ...baseRequest,
        count: 1,
      };

      const response = await chatService.createChatCompletion(requestWithCount);
      const payload = response.data;

      set((current) => {
        const nextVariations = payload.image_variations ?? [];
        const existingKeys = new Set(
          current.imageVariations.map((item) => item.s3_key)
        );
        const mergedVariations = [
          ...current.imageVariations,
          ...nextVariations.filter((item) => !existingKeys.has(item.s3_key)),
        ];
        const firstNew = nextVariations[0] ?? null;

        return {
          imageVariations: mergedVariations,
          selectedVariationKey: firstNew
            ? firstNew.s3_key
            : current.selectedVariationKey,
          selectedStyle: firstNew ? firstNew.style : current.selectedStyle,
          lastAssistantMessage: payload.text_response ?? current.lastAssistantMessage,
          lastRequestBody: { ...baseRequest },
          isGeneratingVariation: false,
        };
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to generate additional variation";
      set({ error: message, isGeneratingVariation: false });
    }
  },
  sendMessage: async (query: string, authorName?: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return;
    }

    const { isLoading } = get();
    if (isLoading) {
      return;
    }

    const displayName = authorName?.trim() || "You";

    const userMessage: ChatMessageState = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedQuery,
      createdAt: new Date().toISOString(),
      author: displayName,
      avatar: null,
    };

    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const state = get();

      const chatHistory =
        state.lastUserMessage && state.lastAssistantMessage
          ? [
              { role: "user" as const, content: state.lastUserMessage },
              {
                role: "assistant" as const,
                content: state.lastAssistantMessage,
              },
            ]
          : [];

      const requestBody: ChatRequestBody = {
        query: trimmedQuery,
        buyer_id: state.buyerId ?? DEFAULT_BUYER_ID,
        chat_history: chatHistory,
        item_id: state.itemId ?? undefined,
      };

      set({ lastRequestBody: requestBody });

      const response = await chatService.createChatCompletion(requestBody);

      const payload = response.data;

      const assistantMessage: ChatMessageState = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: payload.text_response,
        createdAt: new Date().toISOString(),
        author: "LanguageGUI",
        avatar: "/assets/users/bot.png",
      };

      set((current) => {
        const nextImageVariations = payload.image_variations ?? [];
        const firstVariation = nextImageVariations[0];

        return {
          messages: [...current.messages, assistantMessage],
          imageVariations: nextImageVariations,
          selectedVariationKey: firstVariation ? firstVariation.s3_key : null,
          selectedStyle: firstVariation ? firstVariation.style : "",
          lastUserMessage: trimmedQuery,
          lastAssistantMessage: payload.text_response,
          isLoading: false,
        };
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send message";
      set((state) => ({
        messages: state.messages.filter((item) => item.id !== userMessage.id),
        isLoading: false,
        error: message,
      }));
    }
  },
}));

export const useChatMessages = () => useChatStore((state) => state.messages);
