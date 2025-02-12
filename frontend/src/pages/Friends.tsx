import React from "react";
import { Link  } from "react-router-dom";

import { IoClose as CloseIcon } from "react-icons/io5";
import ListOfFriends from "../components/friends/ListOfFriends";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { authProps } from "../redux-store/auth";


const Friends: React.FC = () => {
  const friendsList : authProps["friends"] = useSelector<RootState>(state => state.auth.friends)

  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-purple-500 mb-6">Přátelé</h1>
        <Link to="..">
          <CloseIcon className="text-purple-500" size={30} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ListOfFriends customFriendsList={friendsList} />
      </div>
    </div>
  );
};

export default Friends;
