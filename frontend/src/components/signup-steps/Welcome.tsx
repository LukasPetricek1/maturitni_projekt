import React , { useEffect} from "react";
import { Link } from "react-router-dom";

import { TypedUseSelectorHook ,useSelector } from "react-redux";
import { RootState } from "../../redux-store";
import axiosInstance from "../../axios/instance";

interface WelcomeScreenProps {
  user : { 
    name : string,
    username : string
  }
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ user }) => {

  const store : TypedUseSelectorHook<RootState> = useSelector;
  const auth = store(state => state.auth)

  useEffect(() => { 
    console.log(auth.credentials)
    axiosInstance.post("/register" , {
      credentials : auth.credentials,
      userInfo: auth.userInfo
    })
  } , [auth.credentials, auth.userInfo])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-white mb-2">
        Úspěšně jste se zaregistrovali uživateli <span className="text-purple-500">{user.name}</span>
      </h1>
      <h2 className="text-lg font-medium text-gray-300 mb-6">( {user.username} )</h2>
      <Link to="/login">
        <button className="bg-purple-500 text-white font-medium text-4xl py-2 px-6 rounded-lg hover:bg-purple-800 transition duration-300">
          Přihlásit se
        </button>
      </Link>
    </div>
  );
};

export default WelcomeScreen;
