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

export interface FormContentConfig {
  title: string
  subtitle: string
  nameLabel: string
  seasonLabel: string
  styleLabel: string
  countLabel: string
}

export interface NotificationItem {
  id: string
  type: string
  name: string
  timeAgo: string
  avatarColor: string
}
