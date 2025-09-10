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
    avatar: "/assets/avatar.png",
    isBot: false,
  },
  {
    id: 2,
    user: "LanguageGUI",
    time: "2:46 PM",
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat lorem ipsum dolor sit amet consectetur adipiscing",
    avatar: "/assets/users/bot.png",
    isBot: true,
    tokens: "50 tokens",
  },
  {
    id: 3,
    user: "Mauro Sicard",
    time: "2:47 PM",
    content:
      "Lorem ipsum dolor sit amet consectetur tincidunt bibendum gravida phasellus sed dignissim id tempus ridiculus consectetur dolor sit amet",
    avatar: "/assets/avatar.png",
    isBot: false,
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

  
export const collectionsProducts = [
  { name: "Modern Chair", price: 350, image: "/assets/chair.png", badge: null, variants: ["#c0c0c0", "#8b8b8b", "#444"] },
  { name: "Modern Chair", price: 350, image: "/assets/chair.png", badge: null },
  { name: "Coffee Table", price: 200, originalPrice: 300, image: "/assets/chair.png", badge: "NEW", variants: ["#000", "#fff"] },
  { name: "Folding Table", price: 210, image: "/assets/chair.png", badge: "SALE" },
  { name: "Classic Armchair", price: 350, image: "/assets/chair.png", badge: null, variants: ["#ddd", "#999"] },
  { name: "Papasan Chair", price: 350, image: "/assets/chair.png", badge: null },
  { name: "Rocking Chair", price: 400, image: "/assets/chair.png", badge: null, variants: ["#444", "#222"] },
  { name: "Study Desk", price: 500, originalPrice: 650, image: "/assets/chair.png", badge: "SALE" },
  { name: "Recliner Sofa", price: 900, image: "/assets/chair.png", badge: "NEW", variants: ["#aaa", "#666"] },
  { name: "Dining Table", price: 750, image: "/assets/chair.png", badge: null },
  { name: "Side Table", price: 150, image: "/assets/chair.png", badge: null, variants: ["#999", "#ccc", "#000"] },
  { name: "Office Chair", price: 320, image: "/assets/chair.png", badge: null },
]

export const productsItems = [
  { name: "Modern Chair", price: 350, image: "/assets/table.jpg", badge: null, variants: ["#aaa", "#555", "#222"] },
  { name: "Coffee Table", price: 350, image: "/assets/table.jpg", badge: null },
  { name: "Folding Table", price: 250, image: "/assets/table.jpg", badge: null, variants: ["#ddd", "#666"] },
  { name: "Modern Chair", price: 350, image: "/assets/table.jpg", badge: null },
  { name: "Coffee Table", price: 200, originalPrice: 300, image: "/assets/table.jpg", badge: null },
  { name: "Bookshelf", price: 450, image: "/assets/table.jpg", badge: "NEW", variants: ["#222", "#444"] },
  { name: "Nightstand", price: 180, image: "/assets/table.jpg", badge: null },
  { name: "Lounge Chair", price: 600, image: "/assets/table.jpg", badge: "SALE", variants: ["#ccc", "#888"] },
  { name: "Wardrobe", price: 1200, image: "/assets/table.jpg", badge: null },
  { name: "Shoe Rack", price: 220, image: "/assets/table.jpg", badge: null },
]


  
export const customers = [
  {
    title: "Summer Chairs",
    image: "/assets/table.jpg",
    altImage: "/assets/table.jpg",
  },
  {
    title: "Modern Chair",
    image: "/assets/table.jpg",
    altImage: "/assets/table.jpg",
  },
  {
    title: "Office Chair",
    image: "/assets/table.jpg",
    altImage: "/assets/table.jpg",
  },
  {
    title: "Dining Chair",
    image: "/assets/table.jpg",
    altImage: "/assets/table.jpg",
  },
  {
    title: "Classic Chair",
    image: "/assets/table.jpg",
    altImage: "/assets/table.jpg",
  },
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
