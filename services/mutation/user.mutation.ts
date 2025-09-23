import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "../api/user.api";
import { UserProfile, UpdateUserPayload, ChangePasswordPayload, ChangePasswordResponse } from "@/interfaces/interface";
import { ApiResponse } from "../interface";
import { toast } from "sonner";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<UserProfile>, Error, UpdateUserPayload>({
    mutationFn: async (payload: UpdateUserPayload) => {
      const response = await userService.updateUser(payload);
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile updated successfully");
    },
  });
}

export function useChangePassword() {
  const queryClient = useQueryClient();
  
  return useMutation<ApiResponse<ChangePasswordResponse>, Error, ChangePasswordPayload>({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const response = await userService.changePassword(payload);
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch user profile data
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Password changed successfully");
    },
  });
}
