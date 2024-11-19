import React from "react";

import { FcGoogle } from "react-icons/fc";

const AlternativeSign: React.FC = () => {
  return (
    <div className="mt-4 flex justify-center space-x-4">
      <button className="w-12 h-12 rounded-full active:bg-slate-500 transition  flex items-center justify-center">
        <FcGoogle className="scale-150" />
      </button>
    </div>
  );
};

export default AlternativeSign;
