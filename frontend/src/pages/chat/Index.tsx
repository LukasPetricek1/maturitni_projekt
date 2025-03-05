import React, { useEffect } from "react";
import {
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import { TbSend2 as DirectMessage } from "react-icons/tb";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { IoIosSearch as SearchIcon } from "react-icons/io";




import { NavLink } from "react-router-dom";


const IndexChat: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { org_id } = useParams();

  useEffect(() => {
    if (location.pathname === "/chat/" || location.pathname === "/chat")
      navigate("/chat/@me");
  }, [location.pathname, navigate]);


  return (
    <div className="flex h-screen">
      <aside className="flex flex-col items-center w-20 py-4 bg-purple-950/20">
        <NavLink
          className={({ isActive }) => isActive ? "text-purple-500": "text-white"}
          to="/chat/@me"
        >
          <button className="flex items-center justify-center">
            <DirectMessage className="mb-6 text-2xl cursor-pointer" />
          </button>
        </NavLink>

        <section className="flex flex-col gap-3">
          {/* Organizations here */}
        </section>


        <NavLink
          className={({ isActive }) => isActive ? "text-purple-500": "text-white"}
          to="/chat/org"
        >
          <button className="flex items-center justify-center">
            <SearchIcon  className="mb-6 text-2xl cursor-pointer" />
          </button>
        </NavLink>

        <NavLink
          className={({ isActive }) => isActive ? "text-purple-500": "text-white"}
          to="/chat/create_organization"
        >
          <button className="flex items-center justify-center">
            <AddIcon className="mb-6 text-2xl cursor-pointer" />
          </button>
        </NavLink>
      </aside>

      <Outlet />
    </div>
  );
};

export default IndexChat;
