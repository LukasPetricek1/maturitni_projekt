import React, { useState } from "react";
import MediaUploadSection from "../components/MediaUploadSection";

const CreatePost : React.FC = () => {
  const [description, setDescription] = useState("");

  

  return (
    <div className="h-full w-full flex flex-col items-center  p-4">
      
      <header className="w-full flex justify-center items-center h-16 bg-purple-800/80 rounded-lg">
        <input type="text" defaultValue={"Název Příspěvku"} placeholder="Název příspěvku ..." className="w-full text-white text-center text-lg font-medium bg-transparent outline-none" />
      </header>

      <main className="flex-1 w-full flex flex-col items-center justify-center gap-6 mt-4">

        <MediaUploadSection />

        
        <textarea
          className="relative w-1/2 max-h-56 resize-y border border-gray-400 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Popisek ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </main>

    
      <footer className="w-full flex justify-end items-center gap-4 px-4 pb-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          onClick={() => alert("Příspěvek zahozen!")}
        >
          <span role="img" aria-label="delete">
            🗑️
          </span>
          Zahodit
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
          onClick={() => alert(`Příspěvek publikován: ${description}`)}
        >
          <span role="img" aria-label="publish">
            🚀
          </span>
          Publikovat
        </button>
      </footer>
    </div>
  );
};

export default CreatePost;
