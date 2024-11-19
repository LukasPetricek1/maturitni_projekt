import React, { useState, ChangeEvent, FormEvent } from "react";
import Logo from "../assets/logo.png";

import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 to-purple-800">
      <div className="flex w-11/12 max-w-5xl h-4/5 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        {/* General Info. IDK  */}
        <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-gray-800 p-8">
          <img src={Logo} alt="Logo" className="w-24 h-auto mb-4" />
          <h1 className="text-4xl font-bold text-white">Vítejte</h1>
          <p className="text-gray-300 mt-4 text-center max-w-md">
            Sociální platforma pro všechny, kteří mají rádi technologie
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto"
            autoComplete="off"
          >
            <UserInput
              label="Vaše jméno"
              id="name"
              name="name"
              placeholder="Vaše jméno"
              value={formData.name}
              onChange={handleChange}
            />
            <UserInput
              label="Uživatelské jméno"
              id="username"
              name="username"
              placeholder="Vaše uživatelské jméno"
              value={formData.username}
              onChange={handleChange}
            />
            <UserInput
              type="email"
              label="Email"
              id="email"
              name="email"
              placeholder="Váš email"
              value={formData.email}
              onChange={handleChange}
            />
            <UserInput
              type="password"
              label="Vaše heslo"
              id="password"
              name="password"
              placeholder="Vaše heslo"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Další
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Již máte účet?{" "}
            <a href="/login" className="text-purple-400 hover:underline">
              Přihlásit se
            </a>
          </p>
          <div className="mt-6 text-center">
            <p className="text-gray-400">Nebo</p>
            <AlternativeSign />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
