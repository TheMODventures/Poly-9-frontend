import { ApiResponse } from "../interface";
import {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  GoogleLoginPayload,
  LoginResponse,
} from "../interface/auth/auth.interface";
import axiosService from "../middleware/axios.middleware";
// Local endpoints to simplify structure (removed services/routes)
const AUTH_ENDPOINTS = {
  login: "/v1/auth/login",
  register: "/v1/auth/register",
  googleLogin: "/v1/auth/google-login",
  logout: "/v1/auth/logout",
  refreshToken: "/auth/refresh",
  me: "/auth/me",
} as const;

class AuthApiService {
  async login(credentials: LoginPayload): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosService.post<LoginResponse>(
      AUTH_ENDPOINTS.login,
      credentials
    );
    return response;
  }

  async register(
    payload: RegisterPayload
  ): Promise<ApiResponse<LoginResponse>> {
    const body = { ...payload, role: "admin" } as const;
    const response = await axiosService.post<LoginResponse>(
      AUTH_ENDPOINTS.register,
      body
    );
    return response;
  }

  async googleLogin(
    payload: GoogleLoginPayload
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosService.post<LoginResponse>(
      AUTH_ENDPOINTS.googleLogin,
      payload
    );
    return response;
  }

  async logout(): Promise<void> {
    await axiosService.post<void>(AUTH_ENDPOINTS.logout);
  }

  async refreshToken(): Promise<ApiResponse<AuthUser>> {
    const response = await axiosService.post<AuthUser>(
      AUTH_ENDPOINTS.refreshToken
    );
    return response;
  }

  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    const response = await axiosService.get<AuthUser>(AUTH_ENDPOINTS.me);
    return response;
  }
}

export const authService = new AuthApiService();
