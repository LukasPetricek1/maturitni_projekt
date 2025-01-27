import React from "react";
import { Link } from "react-router-dom";

import VideoBackground from "../../assets/background.mp4";

const UnSignedHome: React.FC = () => {
  return (
    <>

      <div className="relative w-screen h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src={VideoBackground} type="video/mp4" />
          Váš prohlížeč nepodporuje video.
        </video>

        <div className="absolute top-0 left-0 w-full h-full bg-black/80"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
            <span className="text-purple-600">Spojte</span> se s přáteli <br />{" "}
            a sdílejte své zážitky
          </h1>
          <p className="text-lg md:text-xl mb-8 text-center max-w-3xl">
            Naše aplikace vám pomůže zůstat v kontaktu s blízkými, sdílet
            vzpomínky a objevovat nové možnosti spojení. Připojte se ještě dnes
            a zažijte, jaké to je být opravdu propojený.
          </p>

          <div className="flex gap-4">
            <Link to="/signup">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium">
                Zaregistrujte se
              </button>
            </Link>
            <Link to="/about">
              <button className="px-6 py-3 bg-transparent border-2 border-white hover:border-purple-600 hover:text-purple-600 rounded-lg font-medium">
                Více informací
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnSignedHome;
