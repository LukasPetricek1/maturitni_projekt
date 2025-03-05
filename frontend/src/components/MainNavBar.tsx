import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

import AccountButton from "./AccountButton";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { authProps } from "../redux-store/auth";



const NAV_BANNED_PATHS = ["stories" , "chat"]

const MainNavBar: React.FC = () => {
  const auth = useSelector(( state : RootState) => state.auth as authProps).isAuth;

  if ( NAV_BANNED_PATHS.some((bannedPath) => window.location.pathname.includes(bannedPath)) ){
      return <></>
  }

  return (
    <nav
      style={{ gridColumn: "span 24" }}
      className="sticky top-0 z-50 w-full shadow-2xl bg-black/70 backdrop-blur-md"
    >
      <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Logo title />

        {!auth && (
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-purple-500 transition duration-200 hover:text-purple-600"
            >
              Přihlásit se
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-white transition duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              Registrace
            </Link>
          </div>
        )}

        { auth && <AccountButton />}
      </div>
    </nav>
  );
};


export default MainNavBar;
