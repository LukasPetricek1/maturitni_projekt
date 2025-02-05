import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Background from "../assets/background.png"
import Logo from "../assets/logo.png"
import axiosInstance from "../axios/instance";
import { Person } from "../pages/signed/HomePage";
import { useFetch } from "../hooks/useFetch";
import Skeleton from "react-loading-skeleton";
import { RootState } from "../redux-store";

type Friend = {
  id: number;
  username: string;
  hobbies?: string[];
  name: string;
  profilePicture: string;
};

interface Props{ 
  customFriendsList? : Friend[]
}

const ListOfFriends : React.FC<Props> = ({ customFriendsList}) => { 
  const navigate = useNavigate();
  const user_id = useSelector<RootState>(state => state.auth.userInfo?.id)

  async function fetchFriends(){ 
    const response = await axiosInstance.get("/users/other?user_id=" + user_id)
    let data : Person[] = response.data;
    data = data.map(({ id, name, username , profile_picture}) => ({ id, name, username, profile_picture}))
    return data
  }

  const { data : friendsList , isFetching} = useFetch({ 
    fetchFn : fetchFriends,
    initialValue : [] ,
    reCall : location.pathname
  })

  if(isFetching){
    return (<div className="h-full w-full flex flex-col gap-4">
      <Skeleton count={4} baseColor="#6e6e6e" height={200}  />
    </div>)
  }

  const handleNavigate = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const data = customFriendsList || friendsList

  
  return (
    data.map((friend) => (
      <div
        key={friend.id}
        style={{ backgroundImage : `url(${Background})`}}
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

        {friend.hobbies && (
          <section className="flex flex-wrap gap-2 text-sm my-4 h-16 max-h-16 overflow-y-scroll scrollbar-disabled">
            {friend.hobbies.map((hobby, index) => {
              return ( 
                <div key={index} className="h-7 bg-purple-300 rounded-md p-1">{hobby}</div>
              )
            })}
          </section>
        )}

        {/* <button
          className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Přidat do přátel: ${friend.name}`);
          }}
        >
          Přidat do přátel
        </button> */}
      </div>
    ))
  )
}

export default ListOfFriends