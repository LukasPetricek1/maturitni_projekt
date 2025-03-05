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
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <h1 className="mb-2 text-2xl font-bold text-white">
        Úspěšně jste se zaregistrovali uživateli <span className="text-purple-500">{user.name}</span>
      </h1>
      <h2 className="mb-6 text-lg font-medium text-gray-300">( {user.username} )</h2>
      <Link to="/login">
        <button className="px-6 py-2 text-4xl font-medium text-white transition duration-300 bg-purple-500 rounded-lg hover:bg-purple-800">
          Přihlásit se
        </button>
      </Link>
    </div>
  );
};

export default WelcomeScreen;
