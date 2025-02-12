import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Background from "../../assets/background.png";
import Logo from "../../assets/logo.png";
import axiosInstance from "../../axios/instance";
import { Person } from "../../pages/signed/HomePage";
import { useFetch } from "../../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import { RootState } from "../../redux-store";

type Friend = {
  id: number;
  username: string;
  hobbies?: string[];
  name: string;
  profilePicture: string;
};

interface Props {
  customFriendsList?: Friend[];
}

const ListOfFriends: React.FC<Props> = ({ customFriendsList }) => {
  const navigate = useNavigate();
  
  const user_id = useSelector<RootState>((state) => state.auth.userInfo?.id);

  async function fetchFriends() {
    if(!user_id) return []
    const response = await axiosInstance.get("/users/other?user_id=" + user_id);
    let data: Person[] = response.data;
    data = data.map(({ id, name, username, profile_picture }) => ({
      id,
      name,
      username,
      profile_picture,
    }));
    return data;

  }

  const { data: friendsList, isFetching } = useFetch({
    fetchFn: fetchFriends,
    initialValue: [],
    reCall: location.pathname,
  });

  if (isFetching || friendsList.length === 0) {
    return (
      <div className="flex gap-4">
        <Skeleton count={4} baseColor="#6e6e6e" height={200} width={200} />
      </div>
    );
  }

  const handleNavigate = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const data = customFriendsList || friendsList;

  return data.map((friend) => {
    let hobbies = friend.hobbies;
    if(typeof hobbies === "string") hobbies = hobbies.split(",")
    return (
      <div
        key={friend.id}
        style={{ backgroundImage: `url(${Background})` }}
        className="flex flex-col items-center bg-cover bg-center border border-purple-500  shadow-md p-4 rounded-lg hover:shadow-lg cursor-pointer hover:scale-105 transition"
        onClick={() => handleNavigate(friend.username)}
      >
        <img
          src={friend.profilePicture || Logo}
          alt="profile picture"
          className="w-24 h-24 rounded-full mb-3"
        />
        <h2 className="text-lg font-semibold text-white">{friend.name}</h2>
        <p className="text-sm text-gray-400">@{friend.username}</p>

        {hobbies && (
          <section className="flex flex-wrap gap-2 text-sm my-4 h-16 max-h-16 overflow-y-scroll scrollbar-disabled">
            {hobbies.map((hobby, index) => {
              return (
                <div key={index} className="h-7 bg-purple-300 rounded-md p-1">
                  {hobby}
                </div>
              );
            })}
          </section>
        )}
      </div>
    );
  });
};

export default ListOfFriends;
