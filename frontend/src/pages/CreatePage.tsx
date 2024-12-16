import React from "react";

import { Link } from "react-router-dom";

const CreatePage : React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center text-white ">
      
      <header className="w-full h-16 bg-purple-950/50 flex items-center justify-center">
        <h1 className="text-lg font-medium">Co chcete vytvořit?</h1>
      </header>

      
      <div className="flex-1 flex items-center justify-center gap-16 mt-8">
    

        
        <Link to="post"
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-80 aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="w-3/4 h-3/4 bg-purple-500 rounded"></div>
          </div>
          <h2 className="mt-4 font-semibold text-lg">Příspěvek</h2>
        </Link>

      
        <Link to="article"
          className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="w-80 aspect-square bg-blue-100 rounded-lg flex flex-col p-4 gap-2">
            <div className="bg-purple-500 h-1/6 w-4/5 rounded"></div>
            <div className="bg-purple-500 h-1/6 w-full rounded"></div>
            <div className="bg-purple-500 h-2/4 w-3/4 rounded"></div>
            <div className="bg-purple-500 h-1/6 w-2/3 rounded"></div>
            <div className="bg-purple-500 h-1/6 w-3/4 rounded"></div>
          </div>
          <h2 className="mt-4 font-semibold text-lg">Článek</h2>
        </Link>

      </div>
    </div>
  );
};

export default CreatePage;
