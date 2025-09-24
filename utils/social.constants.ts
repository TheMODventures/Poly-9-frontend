import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export const SOCIAL_OPTIONS = [
  { 
    value: "facebook", 
    label: "Facebook", 
    icon: FaFacebook, 
    color: "bg-[#1877F2]",
    hoverColor: "hover:bg-[#166FE5]",
    iconColor: "text-white"
  },
  { 
    value: "twitter", 
    label: "Twitter", 
    icon: FaTwitter, 
    color: "bg-[#1DA1F2]",
    hoverColor: "hover:bg-[#1A91DA]",
    iconColor: "text-white"
  },
  { 
    value: "instagram", 
    label: "Instagram", 
    icon: FaInstagram, 
    color: "bg-gradient-to-br from-[#E4405F] via-[#C13584] to-[#833AB4]",
    hoverColor: "hover:from-[#D6336C] hover:via-[#B02A73] hover:to-[#7C3AED]",
    iconColor: "text-white"
  },
  { 
    value: "linkedin", 
    label: "LinkedIn", 
    icon: FaLinkedin, 
    color: "bg-[#0077B5]",
    hoverColor: "hover:bg-[#006BA1]",
    iconColor: "text-white"
  },
  { 
    value: "youtube", 
    label: "YouTube", 
    icon: FaYoutube, 
    color: "bg-[#FF0000]",
    hoverColor: "hover:bg-[#E60000]",
    iconColor: "text-white"
  },
] as const;

export type SocialOption = typeof SOCIAL_OPTIONS[number];
