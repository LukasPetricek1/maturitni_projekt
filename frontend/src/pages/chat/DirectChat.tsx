import React from "react";
import { useParams } from "react-router-dom";


import { FaEllipsisH, FaPlus} from "react-icons/fa";

const DirectChat: React.FC = () => {

  const { friend_id } = useParams()

  return (
    <>
      <div className="flex-1 flex flex-col bg-purple-300">
      
        <header className="flex items-center justify-between h-16 px-4 bg-gray-300 border-b border-gray-400">
          <h1 className="text-lg font-semibold">{friend_id}</h1>
          <FaEllipsisH className="text-gray-600 cursor-pointer" />
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold">Počátek chatu s {friend_id}</h2>
            <p className="text-sm text-gray-500">Počátek všeho úžasného</p>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="h-10 w-10 rounded-full bg-gray-400"></div>
            <div className="flex-1">
              <div className="mb-1">
                <span className="font-medium">lukas_petricek_</span>{" "}
                <span className="text-sm text-gray-500">14.12.2024 20:33</span>
              </div>
              <p className="text-gray-700">
                Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center h-16 border-t border-gray-400 bg-gray-200 px-4">
          <FaPlus className="text-gray-500 mr-4 cursor-pointer" />
          <input
            type="text"
            placeholder="Napište zprávu ..."
            className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </>
  );
};

export default DirectChat;
