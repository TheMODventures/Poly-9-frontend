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
  BuyerItemsParams,
  BuyerItemsResponse,
  CreateBuyerItemPayload,
  CreateBuyerItemResponse,
} from "@/interfaces/interface";
import axiosService from "../middleware/axios.middleware";

// Buyer endpoints
const BUYER_ENDPOINTS = {
  list: "/v1/buyers",
  create: "/v1/buyers",
  update: "/v1/buyers",
  delete: "/v1/buyers",
  getById: "/v1/buyers",
  items: "/v1/items/buyer",
  createItem: "/v1/items/create",
} as const;

class BuyerApiService {
  async listAllBuyers(
    params?: ListBuyersParams
  ): Promise<ApiResponse<BuyersResponse>> {
    const queryParams = new URLSearchParams();

    if (params?.page) {
      queryParams.append("page", params.page.toString());
    }

    if (params?.limit) {
      queryParams.append("limit", params.limit.toString());
    }

    const url = queryParams.toString()
      ? `${BUYER_ENDPOINTS.list}?${queryParams.toString()}`
      : BUYER_ENDPOINTS.list;

    const response = await axiosService.get<BuyersApiResponse>(url);

    // Transform the nested response to match our expected structure
    return {
      ...response,
      data: response.data.data, // Extract the nested data
    };
  }

  async createBuyer(payload: CreateBuyerPayload): Promise<ApiResponse<Buyer>> {
    const response = await axiosService.post<Buyer>(
      BUYER_ENDPOINTS.create,
      payload
    );
    return response;
  }

  async updateBuyer(
    buyer_id: string,
    payload: UpdateBuyerPayload
  ): Promise<ApiResponse<Buyer>> {
    const response = await axiosService.patch<Buyer>(
      `${BUYER_ENDPOINTS.update}/${buyer_id}`,
      payload
    );
    return response;
  }

  async deleteBuyer(
    params: DeleteBuyerParams
  ): Promise<ApiResponse<DeleteBuyerResponse>> {
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

  async getBuyerItems(
    params: BuyerItemsParams
  ): Promise<ApiResponse<BuyerItemsResponse>> {
    const { buyer_id, type, limit } = params;
    const query = new URLSearchParams();

    if (type) {
      query.append("type", type);
    }

    if (limit) {
      query.append("limit", limit.toString());
    }
    const queryString = query.toString();
    const url = queryString
      ? `${BUYER_ENDPOINTS.items}/${buyer_id}?${queryString}`
      : `${BUYER_ENDPOINTS.items}/${buyer_id}`;

    const response = await axiosService.get<BuyerItemsResponse>(url);
    return response;
  }

  async createBuyerItem(
    payload: CreateBuyerItemPayload
  ): Promise<ApiResponse<CreateBuyerItemResponse>> {
    const response = await axiosService.post<CreateBuyerItemResponse>(
      BUYER_ENDPOINTS.createItem,
      payload
    );
    return response;
  }
}

export const buyerService = new BuyerApiService();
