import { ApiResponse } from "../interface";
import {
  Buyer,
  BuyersResponse,
  BuyersApiResponse,
  ListBuyersParams,
  CreateBuyerPayload,
  UpdateBuyerPayload,
  DeleteBuyerParams,
  DeleteBuyerResponse,
  DocumentUploadResponse,
  GenerateUuidResponse,
} from "@/interfaces/interface";
import axiosService from "../middleware/axios.middleware";

// Buyer endpoints
const BUYER_ENDPOINTS = {
  list: "/v1/buyers/",
  create: "/v1/buyers/",
  update: "/v1/buyers",
  delete: "/v1/buyers",
  getById: "/v1/buyers/",
  uploadDocument: "/v1/documents/upload",
  generateUuid: "/v1/buyers/generate-uuid",
} as const;

class BuyerApiService {
  async listAllBuyers(params?: ListBuyersParams): Promise<ApiResponse<BuyersResponse>> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }
    
    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    if (params?.search) {
      queryParams.append("search", params.search);
    }

    const url = queryParams.toString() 
      ? `${BUYER_ENDPOINTS.list}?${queryParams.toString()}`
      : BUYER_ENDPOINTS.list;

    const response = await axiosService.get<BuyersApiResponse>(url);
    
    // Transform the nested response to match our expected structure
    return {
      ...response,
      data: response.data.data // Extract the nested data
    };
  }

  async createBuyer(payload: CreateBuyerPayload): Promise<ApiResponse<Buyer>> {
    const response = await axiosService.post<Buyer>(
      BUYER_ENDPOINTS.create,
      payload
    );
    return response;
  }

  async updateBuyer(buyer_id: string, payload: UpdateBuyerPayload): Promise<ApiResponse<Buyer>> {
    const response = await axiosService.patch<Buyer>(
      `${BUYER_ENDPOINTS.update}/${buyer_id}`,
      payload
    );
    return response;
  }

  async deleteBuyer(params: DeleteBuyerParams): Promise<ApiResponse<DeleteBuyerResponse>> {
    const response = await axiosService.delete<DeleteBuyerResponse>(
      `${BUYER_ENDPOINTS.delete}/${params.buyer_id}`
    );
    return response;
  }

  async getBuyerById(buyerId: string): Promise<ApiResponse<Buyer>> {
    const response = await axiosService.get<Buyer>(
      `${BUYER_ENDPOINTS.getById}/${buyerId}`
    );
    return response;
  }

  async uploadDocument(buyerId: string, file: File): Promise<ApiResponse<DocumentUploadResponse>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("buyer_id", buyerId);

    const response = await axiosService.post<DocumentUploadResponse>(
      `${BUYER_ENDPOINTS.uploadDocument}?buyer_id=${buyerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }

  async generateUuid(): Promise<ApiResponse<GenerateUuidResponse>> {
    const response = await axiosService.post<GenerateUuidResponse>(
      BUYER_ENDPOINTS.generateUuid
    );
    return response;
  }
}

export const buyerService = new BuyerApiService();
