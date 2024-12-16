import React from "react"
import { NavLink , useLocation} from "react-router-dom"

import { FaHome  } from "react-icons/fa";
import { IoChatboxEllipsesOutline as ChatIcon } from "react-icons/io5";
import { IoMdNotificationsOutline as NotifyIcon , IoIosAddCircleOutline  as CreateIcon } from "react-icons/io";
import { MdOutlinePersonSearch as SearchIcon } from "react-icons/md";
import { RiAccountCircleLine as AccountIcon } from "react-icons/ri";

const AsideLinks = [
  { to : "/" , name : "Domů" , icon : <FaHome />},
  { to : "/chat" , name : "Komunikace" , icon : <ChatIcon />},
  { to : "/notifications" , name : "Upozornění" , icon : <NotifyIcon />},
  { to : "/create" , name : "Vytvořit", icon : <CreateIcon />},
  { to : "/discover/users" , name : "Objevit" , icon : <SearchIcon />},
  { to : "/profile/lukas_petricek_" , name : "Profil", icon : <AccountIcon/>}
]

const Aside : React.FC = () => { 

  const location = useLocation()

  return (
    <aside className={`bg-black/50 text-white text-xl h-full flex flex-col items-center justify-center gap-5`}>
    
      {AsideLinks.map((link, index) => (
        <NavLink key={index } to={link.to} className={({ isActive }) => isActive ? "text-2xl flex gap-4 items-center text-purple-500" : "text-2xl flex gap-4 items-center hover:text-purple-500 transition"}>
          {link.icon}
          {!location.pathname.includes("chat") && <span>{link.name}</span>}
        </NavLink>
      ))}
  </aside>
  )
}

export default Aside;