import ProductCard from "@/components/helper/product-card"
import { NotificationItem, Product } from "@/interfaces/interface"

export const buyersData = [
  {
    id: 1,
    name: "NovaWave LLC",
    logo: "🌊",
    context: "5 files",
    website: "Novwave.com",
    type: "Retailer",
    socials: { facebook: true, instagram: true }
  },
  {
    id: 2,
    name: "BlueSky Industries",
    logo: "🔴",
    context: "5 files",
    website: "Novwave.com",
    type: "Retailer",
    socials: { facebook: true, instagram: true }
  },
  {
    id: 3,
    name: "SilverHawk",
    logo: "🦅",
    context: "5 files",
    website: "Novwave.com",
    type: "Retailer",
    socials: { facebook: true, instagram: true }
  },
  {
    id: 4,
    name: "SummitPeak",
    logo: "🏔️",
    context: "5 files",
    website: "Novwave.com",
    type: "Retailer",
    socials: { facebook: true, instagram: true }
  },
  {
    id: 5,
    name: "RiverStone Ventur",
    logo: "🌑",
    context: "5 files",
    website: "Novwave.com",
    type: "Retailer",
    socials: { facebook: true, instagram: true }
  },
  {
    id: 6,
    name: "Bright Bridge Grp",
    logo: "⭐",
    context: "5 files",
    website: "Novwave.com",
    type: "Retailer",
    socials: { facebook: true, instagram: true }
  },
]

export const typeOptions = [
    { value: "retailer", label: "Retailer (Name of the retailer )" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "interior-designer", label: "Interior Designer" },
    { value: "hospitality", label: "Hospitality" }
  ]

  export const messages = [
    {
      id: 1,
      user: "Mauro Sicard",
      time: "2:45 PM",
      content:
        "Lorem ipsum dolor sit amet consectetur tincidunt bibendum gravida phasellus sed dignissim id tempus ridiculus consectetur dolor sit amet",
      avatar: "M",
    },
    {
      id: 2,
      user: "LanguageGUI",
      time: "2:46 PM",
      content:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat lorem ipsum dolor sit amet consectetur adipiscing",
      avatar: "L",
      isBot: true,
      tokens: "50 tokens",
    },
    {
      id: 3,
      user: "Mauro Sicard",
      time: "2:45 PM",
      content:
        "Lorem ipsum dolor sit amet consectetur tincidunt bibendum gravida phasellus sed dignissim id tempus ridiculus consectetur dolor sit amet",
      avatar: "M",
    },
  ]

 export const products = [
    {
      id: 1,
      name: "Swoon Lounge",
      brand: "Regal Do Lobo",
      price: "$136.79",
      image: "/assets/chair1.svg",
    },
    {
      id: 2,
      name: "Touco Armachiar",
      brand: "Hatil-Loren",
      price: "$148.65",
      image: "/assets/chair2.svg",
    },
  ]

export const featuredProduct: Product = {
  id: "featured",
  name: "Ox Maidens Chair",
  brand: "Hans J. Wegner",
  price: "$9.99",
  image: "/assets/chair.svg",
  description:
    "The Swedish Designer Monica Forstar's Style Is Characterised By Her Enternal Love For New Materials And Beautiful Pure Shapes.",
  rating: 4,
  views: 341,
  likes: 294,
  colors: ["#9CA3AF", "#4B5563", "#14B8A6"],
}

  
  export const collectionsProducts: Array<React.ComponentProps<typeof ProductCard>> = [
    { name: "Modern Chair", price: 350, image: "/assets/chair.png", badge: null },
    { name: "Modern Chair", price: 350, image: "/assets/chair.png", badge: null },
    { name: "Coffee Table", price: 200, originalPrice: 300, image: "/assets/chair.png", badge: "NEW" },
    { name: "Folding Table", price: 210, image: "/assets/chair.png", badge: "SALE" },
    { name: "Classic Armchair", price: 350, image: "/assets/chair.png", badge: null },
    { name: "Papasan Chair", price: 350, image: "/assets/chair.png", badge: null },
    { name: "Modern Chair", price: 250, image: "/assets/chair.png", badge: null },
    { name: "Coffee Table", price: 350, image: "/assets/chair.png", badge: null },
    { name: "Folding Table", price: 250, image: "/assets/chair.png", badge: "SALE" },
    { name: "Modern Chair", price: 250, image: "/assets/chair.png", badge: null },
    { name: "Modern Chair", price: 250, image: "/assets/chair.png", badge: null },
    { name: "Coffee Table", price: 200, originalPrice: 300, image: "/assets/chair.png", badge: "NEW" },
  ]
  
  export  const productsItems: Array<React.ComponentProps<typeof ProductCard>> = [
    { name: "Modern Chair", price: 350, image: "/assets/table.jpg", badge: null },
    { name: "Coffee Table", price: 350, image: "/assets/table.jpg", badge: null },
    { name: "Folding Table", price: 250, image: "/assets/table.jpg", badge: null },
    { name: "Modern Chair", price: 350, image: "/assets/table.jpg", badge: null },
    { name: "Coffee Table", price: 200, originalPrice: 300, image: "/assets/table.jpg", badge: null },
    { name: "Modern Chair", price: 350, image: "/assets/table.jpg", badge: null },
    { name: "Coffee Table", price: 350, image: "/assets/table.jpg", badge: null },
    { name: "Folding Table", price: 250, image: "/assets/table.jpg", badge: null },
    { name: "Modern Chair", price: 350, image: "/assets/table.jpg", badge: null },
    { name: "Coffee Table", price: 200, originalPrice: 300, image: "/assets/table.jpg", badge: null },
  ]

  
export const customers = [
  { name: "Customer name here", memberSince: 2004, items: 120, totalSpent: 2000, returnRate: 75 },
  { name: "Customer name here", memberSince: 2004, items: 120, totalSpent: 2000, returnRate: 75 },
  { name: "Customer name here", memberSince: 2004, items: 120, totalSpent: 2000, returnRate: 40 },
  { name: "Customer name here", memberSince: 2004, items: 120, totalSpent: 2000, returnRate: 20 },
  { name: "Customer name here", memberSince: 2004, items: 120, totalSpent: 2000, returnRate: 80 },
]

export const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'New Buyer Created',
    name: 'Name',
    timeAgo: 'about 13 hours ago',
    avatarColor: 'bg-orange-400'
  },
  {
    id: '2',
    type: 'New Buyer Created',
    name: 'Name',
    timeAgo: 'about 13 hours ago',
    avatarColor: 'bg-orange-400'
  },
  {
    id: '3',
    type: 'New Buyer Created',
    name: 'Name',
    timeAgo: 'about 13 hours ago',
    avatarColor: 'bg-orange-400'
  },
  {
    id: '4',
    type: 'New Buyer Created',
    name: 'Name',
    timeAgo: 'about 13 hours ago',
    avatarColor: 'bg-teal-500'
  }
]
