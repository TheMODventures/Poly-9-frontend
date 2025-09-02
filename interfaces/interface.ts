import { UserRole } from "./enum";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    accessToken: string;
    refreshToken?: string;
}

export interface Buyer {
  id: number
  name: string
  context: string
  website: string
  type: string
  logo?: string
}
