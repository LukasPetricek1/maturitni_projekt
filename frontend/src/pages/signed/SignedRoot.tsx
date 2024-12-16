import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";


import MainNavBar from "../../components/MainNavBar";
import Aside from "../../components/Aside";

const NAV_BANNED_PATHS = ["stories"];

const SignedRoot: React.FC = () => {
  const location = useLocation();

  const [navIsBanned, setNavIsBanned] = useState(false);


  useEffect(() => {
    if (
      NAV_BANNED_PATHS.some((bannedPath) =>
        window.location.pathname.includes(bannedPath)
      )
    ) {
      setNavIsBanned(true);
    } else {
      setNavIsBanned(false);
    }
  }, [location.pathname]);

  const chat = location.pathname.includes("chat");

  
    if (navIsBanned) {
      return (
        <>
          <main>
            <Outlet />
          </main>
        </>
      );
    }

    return (
      <section className="grid grid-cols-24">
        {!location.pathname.includes("chat") && <MainNavBar auth={true} />}

        <div
          style={{ gridColumn: `span ${chat ? 1 : 4}` }}
          className={`h-screen sticky top-0 ${!chat && "-mt-16"}`}
        >
          <Aside />
        </div>
        <div style={{ gridColumn: `span ${chat ? 23 : 20}` }}>
          <Outlet />
        </div>
      </section>
    );
  
};

export default SignedRoot;
