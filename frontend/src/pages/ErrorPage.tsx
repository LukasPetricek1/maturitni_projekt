import React from "react";
import { Link } from "react-router-dom"

const ErrorPage: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-2xl mb-6">
          Jejda! Stránka, kterou hledáte, neexistuje.
        </p>
        <Link to=".." relative="path">
        <button
          className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors duration-300"
        >
          Domů
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;