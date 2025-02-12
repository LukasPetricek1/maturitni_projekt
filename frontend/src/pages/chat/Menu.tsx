import React from "react";

import { useLocation } from "react-router-dom"

import DirectMenu from "./DirectMenu";
import OrgMenu from "./OrgMenu";

import Wumpus from "../../assets/Wumpus2.png"


interface Props{ 
  variant : "direct" | "org",
  data? : {
    org_name : string
  }
}

const Menu: React.FC<Props> = ({ variant }) => {

  const location = useLocation()
  
  return (
    <section className="flex h-screen w-full text-gray-400 font-black">
      {variant === "direct" && <DirectMenu />}
      {variant === "org" && <OrgMenu />}
      
      {/* Pokud si uzivatel nevybral zadny chat, tak se zobrazi uvitaci stranka. */}
      {location.pathname.slice(0, location.pathname.length - 1).match(/\//g)!.length === 2 && (
        <>
          <div style={{ backgroundImage : `url(${Wumpus})`}} className="bg-black w-full h-full pointer-events-none bg-center bg-cover"></div>
        </>
      )}
    </section>
  )
};

export default Menu;
