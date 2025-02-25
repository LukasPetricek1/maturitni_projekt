import { useState, useRef, useEffect } from "react";
import { FaPlus } from "react-icons/fa"

export default function MediaUploadMenu({ onUpload, onEmojiSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white transition bg-purple-600 rounded-full hover:bg-purple-700"
      >
        <FaPlus className={`transition ${isOpen ? "rotate-45" : "rotate-0"}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 w-40 p-2 space-y-2 bg-white rounded-lg shadow-lg bottom-12">
          <button
            onClick={() => {
              onUpload("image");
              setIsOpen(false);
            }}
            className="w-full p-2 text-left rounded-md hover:bg-gray-200"
          >
            📷 Nahrát fotku
          </button>
          <button
            onClick={() => {
              onUpload("video");
              setIsOpen(false);
            }}
            className="w-full p-2 text-left rounded-md hover:bg-gray-200"
          >
            🎥 Nahrát video
          </button>
          <button
            onClick={() => {
              onEmojiSelect();
              setIsOpen(false);
            }}
            className="w-full p-2 text-left rounded-md hover:bg-gray-200"
          >
            😊 Vybrat smajlíka
          </button>
        </div>
      )}
    </div>
  );
}