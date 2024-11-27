import React from "react";
import { Link } from "react-router-dom";

interface LogoProps { 
  title? : boolean;
  scale? : number
}

const Logo: React.FC<LogoProps> = ({ title , scale}) => {

  const imageScale = scale ? scale : 1

  return (
    <Link to="/">
      <div className="flex items-center space-x-3">
        <img
          src="/logo.png" // Změň cestu na skutečnou cestu k obrázku
          alt="Fadigram Logo"
          style={{ height : 40 * imageScale , width : 40 * imageScale}}
        />
        {title && <span className="text-white text-xl font-semibold">Fadigram</span>}
      </div>
    </Link>
  );
};

export default Logo;
