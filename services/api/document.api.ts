import type { AxiosProgressEvent } from "axios";
import { ApiResponse } from "../interface";
import axiosService from "../middleware/axios.middleware";
import { DocumentUploadResponse } from "@/interfaces/interface";

const DOCUMENT_ENDPOINTS = {
  upload: "/v1/documents/upload",
} as const;

export interface UploadDocumentParams {
  buyerId: string;
  file: File;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
}

class DocumentApiService {
  async uploadDocument(
    params: UploadDocumentParams
  ): Promise<ApiResponse<DocumentUploadResponse>> {
    const { buyerId, file, onUploadProgress } = params;

    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosService.post<DocumentUploadResponse>(
      `${DOCUMENT_ENDPOINTS.upload}?buyer_id=${buyerId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );

    return response;
  }
}

export const documentService = new DocumentApiService();

