import React, { useState } from "react";

import { FaPlus } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Newchannel from "../../components/chat/SearchFriend";
import {  useSelector } from "react-redux";
import { RootState } from "../../redux-store";

import Logo from "../../assets/logo.png";
import {  authProps } from "../../redux-store/auth";

const DirectMenu: React.FC = () => {
  const navigate = useNavigate();
  const { friend_id } = useParams();
  
  const channels : authProps["channels"] = useSelector<RootState>(state => state.auth.channels)
  
  const [showMenu, setShowMenu] = useState(false);
  const newchannel = () => {
    setShowMenu(!showMenu);
  };

  const selectchannel = (name: string) => {
    navigate(`/chat/@me/${name}`);
  };

  return (
    <>
      <aside
        className={`${
          !showMenu ? "w-64" : "w-96"
        } bg-purple-900/30 flex flex-col`}
      >
        <div className="flex items-center justify-center h-16 font-semibold text-white bg-purple-800/30">
          Přímé zprávy
        </div>
        <ul className="flex-1 w-full p-4 space-y-2 overflow-y-auto list-none">
          {channels &&
            channels.map((channel, index) => (
              <li className="w-full" key={index}>
                <button
                  onClick={() => selectchannel(channel.name)}
                  key={index}
                  className={` w-full p-2 hover:bg-purple-500 hover:text-white rounded-lg cursor-pointer flex gap-4 items-center justify-center ${
                    channel.name === friend_id
                      ? "bg-purple-500 text-white hover:scale-100"
                      : ""
                  }`}
                  disabled={channel.name === friend_id}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={channel!.profile_picture || Logo}
                  />
                  <div className="flex flex-col text-sm">
                    <span>@{channel!.name}</span>
                  </div>
                </button>
              </li>
            ))}
          {showMenu && (
            <Newchannel
              onClose={() => setShowMenu(false)}
              onComplete={(user) => selectchannel(user.name)}
              usedOnes={channels && channels}
              target="new-direct-chat"
            />
          )}
          <li className="p-3 rounded-md">
            <button className="flex items-center gap-3" onClick={newchannel}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full">
                <FaPlus
                  className={showMenu ? "rotate-45 transition" : "transition"}
                />
              </div>
              <span>{showMenu ? "Zavřít" : "Nový channel"}</span>
            </button>
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
};

export default DirectMenu;
