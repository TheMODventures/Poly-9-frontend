import { LuLayoutGrid } from "react-icons/lu";
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { RiSofaLine } from "react-icons/ri";
import { LuSofa } from "react-icons/lu";
import { IoBedOutline } from "react-icons/io5";
import { PiApplePodcastsLogoThin } from "react-icons/pi";

export const links = [
  { href: "/", icon: LuLayoutGrid },
  { href: "/profile", icon: IoPersonOutline },
  { href: "/settings", icon: IoSettingsOutline },
];

export const categories = [
  { name: "Armchair", active: true, icon: <RiSofaLine className="w-4 h-4" /> },
  { name: "Sofa", active: false, icon: <LuSofa className="w-4 h-4" /> },
  { name: "Bed", active: false, icon: <IoBedOutline className="w-4 h-4" /> },
  {
    name: "Light",
    active: false,
    icon: <PiApplePodcastsLogoThin className="w-4 h-4" />,
  },
];
