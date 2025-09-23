import { useQuery } from "@tanstack/react-query";
import { buyerService } from "../api/buyer.api";
import {
  Buyer,
  BuyerItemsParams,
  BuyerItemsResponse,
  BuyersResponse,
  ListBuyersParams,
} from "@/interfaces/interface";

export function useListBuyers(params?: ListBuyersParams) {
  return useQuery<BuyersResponse, Error>({
    queryKey: ["buyers", params],
    queryFn: async () => {
      const response = await buyerService.listAllBuyers(params);
      return response.data;
    },
  });
}

export function useBuyerById(buyerId?: string) {
  return useQuery<Buyer, Error>({
    queryKey: ["buyer", buyerId],
    enabled: Boolean(buyerId),
    queryFn: async () => {
      if (!buyerId) {
        throw new Error("buyerId is required");
      }
      const response = await buyerService.getBuyerById(buyerId);
      const payload = response.data as Buyer | { data: Buyer };
      if (typeof payload === "object" && payload !== null && "data" in payload) {
        return (payload as { data: Buyer }).data;
      }
      return payload as Buyer;
    },
  });
}

export function useBuyerItems(params?: BuyerItemsParams) {
  const { buyer_id } = params || {};

  return useQuery<BuyerItemsResponse, Error>({
    queryKey: ["buyer-items", buyer_id, params?.type, params?.limit],
    enabled: Boolean(buyer_id),
    queryFn: async () => {
      if (!buyer_id) {
        throw new Error("buyer_id is required");
      }
      const response = await buyerService.getBuyerItems({
        buyer_id,
        type: params?.type,
        limit: params?.limit,
      });
      const payload = response.data as BuyerItemsResponse | { data: BuyerItemsResponse };
      if (typeof payload === "object" && payload !== null) {
        if ("items" in payload) {
          return payload as BuyerItemsResponse;
        }
        if ("data" in payload) {
          return (payload as { data: BuyerItemsResponse }).data;
        }
      }
      throw new Error("Unexpected response shape for buyer items");
    },
  });
}
