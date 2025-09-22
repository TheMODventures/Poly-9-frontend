import { API_URL } from "@/utils/constant";
import { getAccessToken } from "@/utils/helper";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { deleteCookie } from "cookies-next/client";
import { toast } from "sonner";
import { ApiResponse } from "../interface";

interface RequestConfig extends AxiosRequestConfig {}



class AxiosService {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = API_URL
    this.client = axios.create({
      baseURL: this.baseURL,
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      async (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (
          error.response &&
          error.response?.data?.statusCode === 401 &&
          error.response?.data?.message === "session expired"
        ) {
          toast.error("Session Expired");
          deleteCookie("access-token");
          window.location.href = "/login";
          return Promise.reject(error);
        } else {
          // Global error handling for all API errors
          this.handleApiError(error);
          return Promise.reject(error);
        }
      }
    );
  }

  private transformConfig(config?: RequestConfig): AxiosRequestConfig {
    return config || {};
  }

  private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    return {
      data: response.data,
      status: response.status,
      success: response.status < 300,
      headers: response.headers,
    };
  }

  private handleApiError(error: any): void {
    // Extract error message from API response
    const errorMessage = this.extractErrorMessage(error);
    
    // Show toast error
    toast.error(errorMessage);
  }

  private extractErrorMessage(error: any): string {
    // Priority order for error message extraction
    if (error?.response?.data?.detail) {
      return error.response.data.detail;
    }
    
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error?.response?.data?.error) {
      return error.response.data.error;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    // Fallback error message
    return "An unexpected error occurred";
  }

  async get<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.get<T>(url, this.transformConfig(config));
    return this.transformResponse(response);
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.post<T>(url, data, this.transformConfig(config));
    return this.transformResponse(response);
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.put<T>(url, data, this.transformConfig(config));
    return this.transformResponse(response);
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.delete<T>(url, this.transformConfig(config));
    return this.transformResponse(response);
  }
  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.client.patch<T>(url, data, this.transformConfig(config));
    return this.transformResponse(response);
  }

  getClient(): AxiosInstance {
    return this.client;
  }

  setBaseURL(url: string): void {
    this.baseURL = url;
    this.client.defaults.baseURL = url;
  }
}

const axiosService = new AxiosService();
export default axiosService;

export { AxiosService };
export type { RequestConfig, ApiResponse };