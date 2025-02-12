import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import NewChat from "../../components/chat/SearchFriend";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store";

import Logo from "../../assets/logo.png";
import { chatProps } from "../../redux-store/auth";

const DirectMenu: React.FC = () => {
  const navigate = useNavigate();
  const { friend_id } = useParams();
  const chats: chatProps[] = useSelector<RootState>(
    (state) => state.auth.chats
  );
  const [showMenu, setShowMenu] = useState(false);

  const newChat = () => {
    setShowMenu(!showMenu);
  };

  const selectChat = (username: string) => {
    navigate(`/chat/@me/${username}`);
  };

  return (
    <>
      <aside
        className={`${
          !showMenu ? "w-64" : "w-96"
        } bg-purple-900/30 flex flex-col`}
      >
        <div className="flex items-center justify-center h-16 bg-purple-800/30 text-white font-semibold">
          Přímé zprávy
        </div>
        <ul className="flex-1 overflow-y-auto space-y-2 p-4 list-none w-full">
          {chats &&
            chats.map((chat, index) => (
              <li className="w-full" key={index}>
                <button
                  onClick={() => selectChat(chat.username)}
                  key={index}
                  className={` w-full p-2 hover:bg-purple-500 hover:text-white rounded-lg cursor-pointer flex gap-4 items-center justify-center ${
                    chat.username === friend_id
                      ? "bg-purple-500 text-white hover:scale-100"
                      : ""
                  }`}
                  disabled={chat.username === friend_id}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={chat!.profile_picture || Logo}
                  />
                  <div className="flex flex-col text-sm">
                    <span>{chat!.name}</span>
                    <span>@{chat!.username}</span>
                  </div>
                </button>
              </li>
            ))}
          {showMenu && (
            <NewChat
              onClose={() => setShowMenu(false)}
              onComplete={(user) => selectChat(user.username)}
              usedOnes={chats && chats}
              target="new-direct-chat"
            />
          )}
          <li className="p-3 rounded-md">
            <button className="flex items-center gap-3" onClick={newChat}>
              <div className="h-10 w-10 rounded-full  flex items-center justify-center">
                <FaPlus
                  className={showMenu ? "rotate-45 transition" : "transition"}
                />
              </div>
              <span>{showMenu ? "Zavřít" : "Nový Chat"}</span>
            </button>
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
};

export default DirectMenu;
