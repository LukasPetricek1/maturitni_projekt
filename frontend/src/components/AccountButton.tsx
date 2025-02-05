import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { authProps, logout } from "../redux-store/auth";
import { Link , useNavigate }  from "react-router-dom";

import { RiAccountCircleLine as AccountPlaceholder } from "react-icons/ri";
import axiosInstance from "../axios/instance";
import { RootState } from "../redux-store";

const AccountButton : React.FC = () => {
  const dispatch = useDispatch()
  const userInfo  = useSelector((state : RootState) => state.auth as authProps)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); 
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const logOut = () => {
    axiosInstance.get("/logout" , {
      withCredentials : true
    })
    .then(() => {
      dispatch(logout())
      location.pathname = "/"
    })
    .catch(err => console.log(err))
  }

  return (
    <div
      className="relative"
      onMouseEnter={toggleDropdown}
      onMouseLeave={closeDropdown}
    >
      <button
        className="relative w-10 h-10 flex items-center justify-center"
        aria-label="Uživatelský účet"
      >
        <AccountPlaceholder className="text-white" size={40} />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-[50%] translate-x-[50%] bg-purple-800 text-white rounded-lg w-48 shadow-lg z-10"
          
        >
          <Link
            to={`/profile/${userInfo.credentials?.username}`}
            className="block px-4 py-2 text-sm  rounded-lg hover:bg-purple-600"
          >
            Profil
          </Link>
          <button
            onClick={logOut}
            className="block w-full text-left px-4 py-2 text-sm  rounded-lg hover:bg-purple-600 hover:scale-100"
          >
            Odhlásit se
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountButton;