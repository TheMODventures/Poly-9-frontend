import { ApiResponse } from "../interface";
import { FileUploadResponse } from "@/interfaces/interface";
import axiosService from "../middleware/axios.middleware";

// Upload endpoints
const UPLOAD_ENDPOINTS = {
  file: "/v1/uploads/file",
} as const;

class UploadApiService {
  async uploadFile(file: File): Promise<ApiResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosService.post<FileUploadResponse>(
      UPLOAD_ENDPOINTS.file,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  }
}

export const uploadService = new UploadApiService();
