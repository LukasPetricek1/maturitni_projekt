import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import { TbSend2 as DirectMessage } from "react-icons/tb";
import { IoMdAdd as AddIcon } from "react-icons/io";


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
      <aside className="w-20 bg-purple-950/20  flex flex-col items-center py-4">
        <NavLink
          className={({ isActive }) => isActive ? "text-purple-500": "text-white"}
          to="/chat/@me"
        >
          <button className="flex justify-center items-center">
            <DirectMessage className="text-2xl mb-6 cursor-pointer" />
          </button>
        </NavLink>

        <section className="flex flex-col gap-3">
          {/* Organizations here */}
        </section>

        <NavLink
          className={({ isActive }) => isActive ? "text-purple-500": "text-white"}
          to="/chat/create_organization"
        >
          <button className="flex justify-center items-center">
            <AddIcon className="text-2xl mb-6 cursor-pointer" />
          </button>
        </NavLink>
      </aside>

      <Outlet />
    </div>
  );
};

export default IndexChat;
