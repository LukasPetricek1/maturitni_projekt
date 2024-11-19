import React, { useState } from "react";
import Logo from "../assets/logo.png";

import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";

const Login: React.FC = () => {
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="w-full max-w-md bg-opacity-90 p-6  text-white rounded-lg shadow-2xl">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Logo" className="w-20 h-20 mb-4" />
        </div>
        <form>
          <UserInput
            id="username-email"
            name="login"
            label="Uživatelské jméno / Email"
            placeholder="Uživatelské jméno nebo email"
            value={userData.login}
            onChange={handleChange}
          />
          <UserInput
            id="password"
            name="password"
            label="Uživatelské jméno / Email"
            placeholder="Heslo"
            value={userData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors"
          >
            Přihlásit se
          </button>
        </form>
        <div className="mt-6 text-sm text-center">
          <p>
            Ještě nemáte účet?{" "}
            <a href="/signup" className="text-blue-400 hover:underline">
              Zaregistrovat se
            </a>
          </p>
          <p className="mt-4">Nebo</p>
          <AlternativeSign />
        </div>
      </div>
    </div>
  );
};

export default Login;
