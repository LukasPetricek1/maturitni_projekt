import React from "react";

import { FaPlus } from "react-icons/fa";
import { Link, Outlet , useParams} from "react-router-dom";

const conversations = [
  { id: 1, name: "friend-1", active: false },
  { id: 2, name: "friend-2", active: false },
  { id: 3, name: "friend-3", active: false },
  { id: 4, name: "friend-4", active: false },
  { id: 5, name: "friend-5", active: false },
];

const DirectMenu: React.FC = () => {

  const { friend_id } = useParams()

  return (
    <>
        <aside className="w-64 bg-purple-900/30 flex flex-col">
          <div className="flex items-center justify-center h-16 bg-purple-800/30 text-white font-semibold">
            Přímé zprávy
          </div>
          <ul className="flex-1 overflow-y-auto space-y-2 p-4">
            {conversations.map((friend) => (
              <Link key={friend.id} to={`/chat/@me/${friend.name}`}>
                <li
                  key={friend.id}
                  className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                    friend.name === friend_id ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white transition"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-400"></div>
                  <span>{friend.name}</span>
                </li>
              </Link>
            ))}
            <li className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-300">
              <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                <FaPlus />
              </div>
              <span>Přidat</span>
            </li>
          </ul>
        </aside>

        <Outlet />
    </>
  );
};

export default DirectMenu;
