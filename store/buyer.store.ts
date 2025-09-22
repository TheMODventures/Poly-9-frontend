import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Buyer, BuyersResponse } from '@/interfaces/interface';

interface BuyerState {
  // Buyers list data
  buyers: Buyer[];
  pagination: {
    totalItems: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
  } | null;
  
  // Actions
  setBuyers: (buyersResponse: BuyersResponse) => void;
}

export const useBuyerStore = create<BuyerState>()(
  persist(
    (set) => ({
      // Initial state
      buyers: [],
      pagination: null,

      // Actions
      setBuyers: (buyersResponse: BuyersResponse) =>
        set({
          buyers: buyersResponse.data,
          pagination: buyersResponse.pagination,
        }),
    }),
    {
      name: 'buyer-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        buyers: state.buyers,
        pagination: state.pagination,
      }),
    }
  )
);

// Selector hooks for easier access
export const useBuyers = () => useBuyerStore((state) => state.buyers);
export const useBuyerPagination = () => useBuyerStore((state) => state.pagination);
