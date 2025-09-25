import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { documentService, type UploadDocumentParams } from "../api/document.api";

export function useUploadDocument() {
  return useMutation({
    mutationFn: (params: UploadDocumentParams) => documentService.uploadDocument(params),
    onSuccess: (response) => {
      const message =
        typeof response.data?.message === "string"
          ? response.data.message
          : "File uploaded successfully";

      toast.success(message);
    },
  });
}

