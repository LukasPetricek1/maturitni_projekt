import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";

import { TbSend2 as DirectMessage } from "react-icons/tb";


const organizations = [
  { id: 1, name: "arg-1" },
  { id: 2, name: "brg-2" },
  { id: 3, name: "crg-3" },
  { id: 4, name: "drg-4" },
  { id: 5, name: "erg-5" },
];

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
        <Link
          className={
            location.pathname === "/chat/@me" ||
            location.pathname === "/chat/@me/"
              ? "text-purple-500"
              : "text-white"
          }
          to="/chat/@me"
        >
          <button className="flex justify-center items-center">
            <DirectMessage className="text-2xl mb-6 cursor-pointer" />
          </button>
        </Link>

        <section className="flex flex-col gap-3">
          {organizations.map((org) => {
            return (
              <Link key={org.id} to={`/chat/${org.name}`}>
                <button
                  title={org.name}
                  className={`rounded-full w-10 aspect-square grid content-center justify-center text-xl ${
                    org_id === org.name ? "bg-purple-500" : "bg-gray-300"
                  }`}
                >
                  <span>{org.name.slice(0, 1)}</span>
                </button>
              </Link>
            );
          })}
        </section>
      </aside>

      <Outlet />
    </div>
  );
};

export default IndexChat;
