import { useQuery } from "@tanstack/react-query";
import { authService } from "../api/auth.api";
import { userService } from "../api/user.api";
import { AuthUser } from "../interface/auth/auth.interface";
import { UserProfile } from "@/interfaces/interface";
import { ApiResponse } from "../interface";

function useCurrentUser() {
  return useQuery<ApiResponse<AuthUser> | null>({
    queryKey: ["user"],
    queryFn: () => authService.getCurrentUser(),
  });
}

export function useGetUser() {
  return useQuery<ApiResponse<UserProfile>, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await userService.getUser();
      return response;
    },
  });
}

export default useCurrentUser;
