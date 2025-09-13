import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../api/auth.api";
import { removeAccessToken, setAccessToken } from "@/utils/helper";
import {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  LoginResponse,
} from "../interface/auth/auth.interface";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (credentials: LoginPayload) => {
      const response: any = await authService.login(credentials);
      return response;
    },
    onSuccess: ({ access_token, user }) => {
      setAccessToken(access_token);
      useAuthStore.getState().setAuth(user, access_token);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    },
  });
}

export function useRegister() {
  return useMutation<AuthUser, Error, RegisterPayload>({
    mutationFn: async (data: RegisterPayload) => {
      const response = await authService.register(data);
      return response.data;
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      removeAccessToken();
      try {
        useAuthStore.getState().clearAuth();
      } catch {}
      try {
        queryClient.clear();
      } catch {}
      toast.success("Logged out");
      router.push("/login");
    },
    onError: (err) => {
      toast.error(err?.message || "Logout failed, session cleared locally");
    },
  });
}

export function useRefreshToken() {
  return useMutation<AuthUser, Error, void>({
    mutationFn: async () => {
      const response = await authService.refreshToken();
      return response.data;
    },
  });
}
