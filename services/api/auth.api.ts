import { ApiResponse } from "../interface";
import {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  LoginResponse,
} from "../interface/auth/auth.interface";
import axiosService from "../middleware/axios.middleware";
// Local endpoints to simplify structure (removed services/routes)
const AUTH_ENDPOINTS = {
  login: "/v1/auth/login",
  register: "/auth/register",
  logout: "/v1/auth/logout",
  refreshToken: "/auth/refresh",
  me: "/auth/me",
} as const;

class AuthApiService {
  async login(credentials: LoginPayload): Promise<ApiResponse<LoginResponse>> {
    const { data } = await axiosService.post<ApiResponse<LoginResponse>>(
      AUTH_ENDPOINTS.login,
      credentials
    );
    return data;
  }

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthUser>> {
    const { data } = await axiosService.post<ApiResponse<AuthUser>>(
      AUTH_ENDPOINTS.register,
      payload
    );
    return data;
  }

  async logout(): Promise<void> {
    await axiosService.post<void>(AUTH_ENDPOINTS.logout);
  }

  async refreshToken(): Promise<ApiResponse<AuthUser>> {
    const { data } = await axiosService.post<ApiResponse<AuthUser>>(
      AUTH_ENDPOINTS.refreshToken
    );
    return data;
  }

  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    const { data } = await axiosService.get<ApiResponse<AuthUser>>(
      AUTH_ENDPOINTS.me
    );
    return data;
  }
}

export const authService = new AuthApiService();
