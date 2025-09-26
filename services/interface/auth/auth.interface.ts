import { User } from "@/interfaces/interface";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    email: string;
    password: string;
    name: string;
}

export interface GoogleLoginPayload {
    email: string;
    social_auth_id: string;
    name: string;
}

// Response shape for /auth/login
export interface LoginUser {
  email: string;
  name: string;
  role: string;
  auth_provider: string;
  last_login: string; // ISO timestamp
}

export interface LoginResponse {
  access_token: string;
  token_type: string; // typically 'bearer'
  user: LoginUser;
}

// Legacy type used elsewhere in app for /auth/me etc.
export interface AuthUser extends User {
    accessToken: string;
    refreshToken?: string;
}
