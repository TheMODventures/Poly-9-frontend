import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export const SOCIAL_OPTIONS = [
  { value: "facebook", label: "Facebook", icon: FaFacebook, color: "bg-blue-600" },
  { value: "twitter", label: "Twitter", icon: FaTwitter, color: "bg-blue-400" },
  { value: "instagram", label: "Instagram", icon: FaInstagram, color: "bg-pink-500" },
  { value: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "bg-blue-700" },
  { value: "youtube", label: "YouTube", icon: FaYoutube, color: "bg-red-600" },
] as const;

export type SocialOption = typeof SOCIAL_OPTIONS[number];
