import React from "react";
import { Link } from "react-router-dom";

interface WelcomeScreenProps {
  user : { 
    name : string,
    username : string
  }
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-white mb-2">
        Vítejte uživateli {user.name}
      </h1>
      <h2 className="text-lg font-medium text-gray-300 mb-6">( {user.username} )</h2>
      <Link to="/">
        <button className="bg-green-400 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-500 transition duration-300">
          Prozkoumat aplikaci
        </button>
      </Link>
    </div>
  );
};

export default WelcomeScreen;
