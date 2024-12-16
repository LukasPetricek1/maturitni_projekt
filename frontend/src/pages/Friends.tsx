import React from "react";
import { Link } from "react-router-dom";

import { IoClose as CloseIcon } from "react-icons/io5";
import ListOfFriends from "../components/ListOfFriends";

import { friendsData } from "../data/friendsData";

const Friends: React.FC = () => {

  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-purple-500 mb-6">Přátelé</h1>
        <Link to="..">
          <CloseIcon className="text-purple-500" size={30} />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ListOfFriends friendsList={friendsData} />
      </div>
    </div>
  );
};

export default Friends;
