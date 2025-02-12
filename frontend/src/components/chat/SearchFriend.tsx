import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addChat, authProps, chatProps } from "../../redux-store/auth";

import Logo from "../../assets/logo.png"
import { RootState } from "../../redux-store";

interface SearchFriendProps{ 
  onClose : () => void ;
  onComplete : (user : chatProps) => void;
  usedOnes : chatProps[];
  target? : string

}

const SearchFriend : React.FC<SearchFriendProps> = ({ onClose , onComplete , usedOnes, target }) => {
  const dispatch = useDispatch()
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<chatProps[]>([]);
    const friends: authProps["friends"] = useSelector<RootState>(
      (state) => state.auth.friends
    );


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      if(friends){ 
        const result = friends.filter(function(friend){
          if(!usedOnes || !usedOnes.some(used => used.id === friend.id)){
          const userQuery = value.trim().toLocaleLowerCase()
          const friendName = friend.name.trim().toLocaleLowerCase()
          const friendUsername = friend.username.trim().toLocaleLowerCase()

          if(friendName.includes(userQuery) || friendUsername.includes(value)){ 
            return friend
          }
        }
        })
        setResults(result)
      }
    } else {
      setResults([]);
    }
  };

  const selectChat = (username : string) => { 
    if(results){ 
      const user = results.filter(result => result.username === username)[0]
      if(target && target === "new-direct-chat"){
        dispatch(addChat(user))
      }

      onComplete(user)
      onClose()
    }
  }

  return (
    <>
    <div className="relative w-full bg-white shadow-lg rounded-xl p-2 outline-none">

      <input
        type="text"
        placeholder="Prohledat přátele..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 rounded-lg bg-white/40 backdrop-blur-md  border-b-4 border-purple-950 text-black placeholder-gray-500 outline-none"
      />

      {results && results.length > 0 && (
        <div className="mt-2 bg-white/50 backdrop-blur-md rounded-lg shadow-lg">
          {results && results.map((value, index) => (
            <button onClick={() => selectChat(value!.username)} key={index} className="p-2 hover:bg-white/70 rounded-lg cursor-pointer flex gap-4 items-center justify-center">
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
      <p className="text-center text-sm font-medium">Nikoho jsme nenašli</p>
    )}
    </>
  );
}

export default SearchFriend;