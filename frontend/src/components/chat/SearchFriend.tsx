import React, { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  authProps, chatProps, loadChannels } from "../../redux-store/auth";

import Logo from "../../assets/logo.png"
import { RootState } from "../../redux-store";
import { Link } from "react-router-dom";

import { FaUserPlus } from "react-icons/fa";


interface SearchFriendProps{ 
  onClose : () => void ;
  onComplete : (user : chatProps) => void;
  usedOnes : authProps["channels"][];
  target? : string

}

const SearchFriend : React.FC<SearchFriendProps> = ({ onClose , onComplete , usedOnes, target }) => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<chatProps[]>([]);
    const friends: authProps["friends"] = useSelector<RootState>(
      (state) => state.auth.friends
    );

  const getChat = useCallback((value : string) => { 
    if(friends){
      const result = friends.filter(function(friend){
        if(!usedOnes || !usedOnes.some(used => used.name === friend.username)){
        const userQuery = value.trim().toLocaleLowerCase()
        const friendName = friend.name.trim().toLocaleLowerCase()
        const friendUsername = friend.username.trim().toLocaleLowerCase()
  
        if(friendName.includes(userQuery) || friendUsername.includes(value)){ 
          return friend
        }
      }
      })
      return result
    }
  } , [friends, usedOnes])


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    setResults(getChat(value))
  };

  useLayoutEffect(() => { 
    if(friends){ 
      setResults(getChat(""))
    }
  } , [friends, getChat])

  const selectChat = (username : string) => { 
    if(results){ 
      const user = results.filter(result => result.username === username)[0]
      const chat = {
        id : user.id,
        name : user.username,
        profile_picture: user.profile_picture
      }
      console.log(target)
      if(target && target === "new-direct-chat"){
        console.log(chat)
        dispatch(loadChannels([chat]))
      }

      onComplete(chat)
      onClose()
    }
  }

  return (
    <>
    <div className="relative w-full p-2 bg-white shadow-lg outline-none rounded-xl">

      <input
        type="text"
        placeholder="Prohledat přátele..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 text-black placeholder-gray-500 border-b-4 rounded-lg outline-none bg-white/40 backdrop-blur-md border-purple-950"
      />

      {results && results.length > 0 && (
        <div className="mt-2 rounded-lg shadow-lg bg-white/50 backdrop-blur-md">
          {results && results.map((value, index) => (
            <button onClick={() => selectChat(value!.username)} key={index} className="flex items-center justify-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-white/70">
              <img className="w-8 h-8 rounded-full" src={value!.profile_picture || Logo} />
              <div className="flex flex-col text-sm">
                <span>{value!.name}</span>
                <span>@{value!.username}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
    {results && results.length === 0 && (
      <div className="flex flex-col items-center justify-center gap-5">
      <p className="text-sm font-medium text-center">Nikoho jsme nenašli</p>
      <Link to="/discover/users" className="flex items-center gap-2 p-2 text-white transition bg-purple-800 rounded-md hover:scale-105"><FaUserPlus />Najít Přátele</Link>
      </div>
    )}
    </>
  );
}

export default SearchFriend;