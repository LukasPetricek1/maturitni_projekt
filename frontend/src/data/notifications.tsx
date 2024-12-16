import { FaUserPlus, FaHeart, FaCommentDots, FaBell } from "react-icons/fa";

export interface NotificationProps{ 
  id : number; 
  type : "friend" | "like" | "comment" | "system";
  icon : JSX.Element;
  message : string;
  time: string; 
  read: boolean
}

export const notifications = [
  {
    id: 1,
    type: "friend",
    icon: <FaUserPlus className="text-blue-500" />,
    message: "Jan Novák si vás přidal do přátel.",
    time: "Před 2 hodinami",
    read: false,
  },
  {
    id: 2,
    type: "like",
    icon: <FaHeart className="text-red-500" />,
    message: "Petra Horáková označila váš příspěvek jako To se mi líbí.",
    time: "Před 4 hodinami",
    read: false,
  },
  {
    id: 3,
    type: "comment",
    icon: <FaCommentDots className="text-green-500" />,
    message: "Tomáš Dvořák okomentoval váš příspěvek: 'Skvělá práce!'",
    time: "Před 1 dnem",
    read: false,
  },
  {
    id: 4,
    type: "system",
    icon: <FaBell className="text-purple-500" />,
    message: "Nová funkce: Vyhledávání podle zájmů je nyní dostupné!",
    time: "Před 3 dny",
    read: false,
  }
];