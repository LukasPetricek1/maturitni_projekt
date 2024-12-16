import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

import { RiAccountCircleLine as AccountPlaceholder } from "react-icons/ri";

interface NavBarProps{
  auth : boolean
}

const MainNavBar: React.FC<NavBarProps> = ({ auth }) => {
  return (
    <nav style={{ gridColumn :  "span 24"}} className="sticky top-0 w-full bg-black/70 backdrop-blur-md shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <Logo title />

        {!auth && <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-purple-500 hover:text-purple-600 transition duration-200"
          >
            Přihlásit se
          </Link>
          <Link
            to="/signup"
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-200"
          >
            Registrace
          </Link>
        </div>}

        {auth && <Link to="/profile/lukas_petricek_">
          <button
            className="relative w-10 h-10 flex items-center justify-center "
            aria-label="Uživatelský účet"
          >
            <AccountPlaceholder className="text-white" size={40} />
          </button>
        </Link>}
      </div>
    </nav>
  );
};

export default MainNavBar;
