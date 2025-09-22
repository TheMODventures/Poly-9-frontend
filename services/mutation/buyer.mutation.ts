import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buyerService } from "../api/buyer.api";
import { uploadService } from "../api/upload.api";
import {
  Buyer,
  BuyersResponse,
  ListBuyersParams,
  CreateBuyerPayload,
  UpdateBuyerPayload,
  DeleteBuyerParams,
  DeleteBuyerResponse,
  FileUploadResponse,
} from "@/interfaces/interface";
import { toast } from "sonner";
import { useBuyerStore } from "@/store/buyer.store";

export function useListBuyers() {
  const setBuyers = useBuyerStore((state) => state.setBuyers);
  
  return useMutation<BuyersResponse, Error, ListBuyersParams | undefined>({
    mutationFn: async (params?: ListBuyersParams) => {
      const response = await buyerService.listAllBuyers(params);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("data", data);
      setBuyers(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to fetch buyers");
    },
  });
}

export function useCreateBuyer() {
  const queryClient = useQueryClient();
  
  return useMutation<Buyer, Error, CreateBuyerPayload>({
    mutationFn: async (payload: CreateBuyerPayload) => {
      const response = await buyerService.createBuyer(payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Buyer created successfully");
      // Invalidate and refetch buyers list
      queryClient.invalidateQueries({ queryKey: ["buyers"] });
    },
    // Error handling is now done globally in axios middleware
  });
}

export function useUpdateBuyer() {
  const queryClient = useQueryClient();
  
  return useMutation<Buyer, Error, { buyer_id: string; payload: UpdateBuyerPayload }>({
    mutationFn: async ({ buyer_id, payload }) => {
      const response = await buyerService.updateBuyer(buyer_id, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Buyer updated successfully");
      // Invalidate and refetch buyers list
      queryClient.invalidateQueries({ queryKey: ["buyers"] });
    },
    // Error handling is now done globally in axios middleware
  });
}

export function useDeleteBuyer() {
  const queryClient = useQueryClient();
  
  return useMutation<DeleteBuyerResponse, Error, DeleteBuyerParams>({
    mutationFn: async (params: DeleteBuyerParams) => {
      const response = await buyerService.deleteBuyer(params);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Buyer deleted successfully");
      // Invalidate and refetch buyers list
      queryClient.invalidateQueries({ queryKey: ["buyers"] });
    },
    // Error handling is now done globally in axios middleware
  });
}

export function useUploadFile() {
  return useMutation<FileUploadResponse, Error, File>({
    mutationFn: async (file: File) => {
      const response = await uploadService.uploadFile(file);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`File "${data.filename}" uploaded successfully`);
    },
    // Error handling is now done globally in axios middleware
  });
}
