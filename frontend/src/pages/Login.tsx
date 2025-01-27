import React, { useState   } from "react";
import { Link, useNavigate  } from "react-router-dom"


import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";
import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { authProps, login } from "../redux-store/auth";
import axiosInstance from "../axios/instance";
import { RootState } from "../redux-store";

const Login: React.FC = () => {
  const navigate = useNavigate()
  const auth = useSelector(( state : RootState) => state.auth as authProps).isAuth;
  const dispatch = useDispatch()
  const [userData, setUserData] = useState({
    login: "",
    password: "",
  });

  if(auth){
    navigate("/")
  }


  const loginSubmited = (e : React.FormEvent) => { 
    e.preventDefault()

    axiosInstance.post("/login" , {
      email : userData.login,
      password: userData.password
    } , {
      withCredentials : true
    })
    .then(response => {
      dispatch(login(response.data))

      location.href = "/"
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <div className="w-full max-w-md bg-opacity-90 p-6  text-white rounded-3xl shadow-pink-normal">
        <div className="flex justify-center p-5">
          <Logo title scale={1} />
        </div>
        <form autoComplete="off" onSubmit={loginSubmited}>
          <UserInput
            maxLength={100}
            type="text"
            id="username-email"
            name="login"
            label="Uživatelské jméno / Email"
            placeholder="Uživatelské jméno nebo email"
            value={userData.login}
            onChange={handleChange}
          />
          <UserInput
            maxLength={30}
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