import { ApiResponse } from "../interface";
import { UserProfile, UpdateUserPayload, ChangePasswordPayload, ChangePasswordResponse } from "@/interfaces/interface";
import axiosService from "../middleware/axios.middleware";

// User endpoints
const USER_ENDPOINTS = {
  getUser: "/v1/users",
  updateUser: "/v1/users",
  changePassword: "/v1/users/change-password",
} as const;

class UserApiService {
  async getUser(): Promise<ApiResponse<UserProfile>> {
    const response = await axiosService.get<UserProfile>(USER_ENDPOINTS.getUser);
    return response;
  }

  async updateUser(payload: UpdateUserPayload): Promise<ApiResponse<UserProfile>> {
    const response = await axiosService.patch<UserProfile>(USER_ENDPOINTS.updateUser, payload);
    return response;
  }

  async changePassword(payload: ChangePasswordPayload): Promise<ApiResponse<ChangePasswordResponse>> {
    const response = await axiosService.patch<ChangePasswordResponse>(USER_ENDPOINTS.changePassword, payload);
    return response;
  }
}

export const userService = new UserApiService();
