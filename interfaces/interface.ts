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

export interface UserProfile {
    email: string;
    name: string;
    password_hash: string;
    role: string;
    social_auth_id: string | null;
    auth_provider: string;
    profilePhoto: string | null;
    phone: string | null;
    designation: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_login: string;
}

export interface UpdateUserPayload {
    name?: string;
    phone?: string;
    designation?: string;
    profilePhoto?: string;
}

export interface ChangePasswordPayload {
    current_password: string;
    new_password: string;
}

export interface ChangePasswordResponse {
    message: string;
    user: UserProfile;
}

export interface PasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface BuyerSocial {
  name: string;
  url: string;
}

export interface Buyer {
  buyer_id: string;
  company: string;
  name: string | null;
  website: string | null;
  socials: BuyerSocial[];
  type: string | null;
  note: string | null;
  files: string[];
  created_at: string;
  updated_at: string;
  total_generations: number;
  total_documents: number;
}

export interface Pagination {
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface BuyersResponse {
  data: Buyer[];
  pagination: Pagination;
}

export interface BuyersApiResponse {
  statusCode: number;
  message: string;
  data: BuyersResponse;
}

export interface ListBuyersParams {
  page?: number;
  limit?: number;
}

export interface CreateBuyerPayload {
  company: string;
  website?: string;
  socials?: BuyerSocial[];
  type?: string;
  note?: string;
  files?: string[];
}

export interface UpdateBuyerPayload extends Partial<CreateBuyerPayload> {
  // buyer_id is passed in URL, not in payload
}

export interface DeleteBuyerParams {
  buyer_id: string;
}

export interface DeletionReport {
  buyer_deleted: boolean;
  documents_deleted: number;
  sessions_deleted: number;
  s3_files_deleted: number;
  opensearch_index_deleted: boolean;
  errors: string[];
  buyer_company: string;
  buyer_website: string;
  buyer_type: string;
  buyer_note: string;
}

export interface DeleteBuyerResponse {
  message: string;
  deletion_report: DeletionReport;
}

export interface BuyerItemImage {
  image_url: string;
  prompt: string | null;
  generation_date: string | null;
  session_id: string | null;
  image_id: string | null;
  s3_key: string | null;
  style: string[];
  variation?: number;
}

export interface BuyerItem {
  item_id: string;
  buyer_id: string;
  type: string;
  name: string;
  season: string | null;
  style: string[];
  target_image_count: number;
  description: string | null;
  tags: string[];
  generated_images: BuyerItemImage[];
  total_images_generated: number;
  created_at: string;
  updated_at: string;
  metadata: Record<string, unknown>;
}

export interface BuyerItemsFilters {
  buyer_id: string;
  type?: string;
  limit?: number;
}

export interface BuyerItemsResponse {
  items: BuyerItem[];
  total_count: number;
  filters_applied: BuyerItemsFilters;
}

export interface BuyerItemsParams {
  buyer_id: string;
  type?: string;
  limit?: number;
}

export interface CreateBuyerItemPayload {
  buyer_id: string;
  type: "product" | "collection";
  name: string;
  season: string;
  style: string[];
  target_image_count?: number;
}

export interface CreateBuyerItemResponse {
  item_id: string;
  message: string;
  item: BuyerItem;
}

export interface DeleteBuyerItemParams {
  item_id: string;
}

export interface DeleteBuyerItemResponse {
  message: string;
}

// File Upload interfaces
export interface FileUploadResponse {
  file_id: string;
  filename: string;
  content_type: string;
  s3_key: string;
  url: string;
  uploaded_at: string;
}

export interface DocumentUploadResponse {
  message?: string;
  document_id?: string;
  [key: string]: unknown;
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


export interface UploadFile {
  id: number;
  name: string;
  size: number;
  uploaded: number;
  status: "uploading" | "completed";
}
