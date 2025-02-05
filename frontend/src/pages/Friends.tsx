import React, { useLayoutEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";

import { IoClose as CloseIcon } from "react-icons/io5";
import ListOfFriends from "../components/ListOfFriends";
import axiosInstance from "../axios/instance";


const Friends: React.FC = () => {
  const [friendsList, setFriendsList] = useState([])
  const { user_id } = useOutletContext<{ user_id : number }>()

  useLayoutEffect(() => { 
    if(user_id){
      axiosInstance.get(`users/${user_id}/friends`)
      .then(response => {
        if(response.data){ 
          const data = response.data
          setFriendsList(data)
        }
      })
      .catch(err => console.log(err))
    }
  } , [user_id])

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
