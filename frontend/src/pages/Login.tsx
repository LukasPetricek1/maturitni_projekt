import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom"


import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";
import Logo from "../components/Logo";

const Login: React.FC = () => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  useEffect(() => { 
    
  } , [userData])

  const loginSubmited = (e : React.FormEvent) => { 
    e.preventDefault()

    console.log(userData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full max-w-md bg-opacity-90 p-6  text-white rounded-3xl shadow-pink-normal">
        <div className="flex justify-center p-5">
          <Logo title scale={1} />
        </div>
        <form autoComplete="off" onSubmit={loginSubmited}>
          <UserInput
            type="text"
            id="username-email"
            name="login"
            label="Uživatelské jméno / Email"
            placeholder="Uživatelské jméno nebo email"
            value={userData.login}
            onChange={handleChange}
          />
          <UserInput
            type="password"
            id="password"
            name="password"
            label="Heslo"
            placeholder="Heslo"
            value={userData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors"
          >
            Přihlásit se
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <p>
            Ještě nemáte účet?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Zaregistrovat se
            </Link>
          </p>
          <p className="mt-4">Nebo</p>
          <AlternativeSign />
        </div>
      </div>
    </div>
  );
};

export default Login;
