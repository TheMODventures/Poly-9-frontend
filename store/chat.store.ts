import { create } from "zustand";
import { chatService } from "@/services/api/chat.api";
import type {
  ChatImageVariation,
  ChatRole,
} from "@/services/interface/chat/chat.interface";

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
  lastUserMessage: string | null;
  lastAssistantMessage: string | null;
  isLoading: boolean;
  error: string | null;
  setBuyerId: (buyerId: string | null) => void;
  setItemId: (itemId: string | null) => void;
  setContext: (context: { buyerId: string | null; itemId: string | null }) => void;
  resetSession: () => void;
  clearError: () => void;
  sendMessage: (query: string, authorName?: string) => Promise<void>;
  selectVariation: (variationKey: string) => void;
}

const DEFAULT_BUYER_ID = "6ec4a004-5b4c-42e6-b50c-a1592c9725ba";

export const useChatStore = create<ChatStoreState>((set, get) => ({
  buyerId: null,
  itemId: null,
  messages: [],
  imageVariations: [],
  selectedVariationKey: null,
  selectedStyle: "",
  lastUserMessage: null,
  lastAssistantMessage: null,
  isLoading: false,
  error: null,
  setBuyerId: (buyerId) => set({ buyerId }),
  setItemId: (itemId) => set({ itemId }),
  setContext: ({ buyerId, itemId }) => set({ buyerId, itemId }),
  resetSession: () =>
    set({
      messages: [],
      imageVariations: [],
      selectedVariationKey: null,
      selectedStyle: "",
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

      const response = await chatService.createChatCompletion({
        query: trimmedQuery,
        buyer_id: state.buyerId ?? DEFAULT_BUYER_ID,
        chat_history: chatHistory,
        item_id: state.itemId ?? undefined,
      });

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
