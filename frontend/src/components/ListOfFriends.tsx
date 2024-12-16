import React from "react";
import { useNavigate } from "react-router-dom";

type Friend = {
  id: number;
  username: string;
  hobbies?: string[];
  name: string;
  profilePicture: string;
};

interface Props{ 
  friendsList : Friend[]
}

const ListOfFriends : React.FC<Props> = ({ friendsList }) => { 
  const navigate = useNavigate();

  const handleNavigate = (username: string) => {
    navigate(`/profile/${username}`);
  };

  return (
    friendsList.map((friend) => (
      <div
        key={friend.id}
        className="flex flex-col items-center bg-white shadow-md p-4 rounded-lg hover:shadow-lg cursor-pointer hover:scale-105 transition"
        onClick={() => handleNavigate(friend.username)}
      >
        <img
          src={friend.profilePicture}
          alt="profile picture"
          className="w-24 h-24 rounded-full mb-3"
        />
        <h2 className="text-lg font-semibold text-gray-800">{friend.name}</h2>
        <p className="text-sm text-gray-500">@{friend.username}</p>

        {friend.hobbies && (
          <section className="flex flex-wrap gap-2 text-sm my-4 h-16 max-h-16 overflow-y-scroll scrollbar-disabled">
            {friend.hobbies.map((hobby, index) => {
              return ( 
                <div key={index} className="h-7 bg-purple-300 rounded-md p-1">{hobby}</div>
              )
            })}
          </section>
        )}

        <button
          className="mt-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          onClick={(e) => {
            e.stopPropagation();
            alert(`Přidat do přátel: ${friend.name}`);
          }}
        >
          Přidat do přátel
        </button>
      </div>
    ))
  )
}

export default ListOfFriends