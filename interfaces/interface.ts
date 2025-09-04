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

export interface ProfileData {
  name: string
  phone: string
  designation: string
  email: string
  password: string
}

export interface Product {
  id: string
  name: string
  brand: string
  price: string
  image: string
  description?: string
  rating?: number
  views?: number
  likes?: number
  colors?: string[]
}