import { useQuery } from "@tanstack/react-query";
import { buyerService } from "../api/buyer.api";
import {
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
