import React, { useState, useRef } from "react";
import { RiDragDropLine as DragAndDropImage } from "react-icons/ri";
import axiosInstance from "../../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store";

interface Props {
  onComplete: () => void;
}

const ProfilePhotoUpload: React.FC<Props> = ({ onComplete }) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const username = useSelector<RootState>(state => state.auth.credentials?.username)

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);

    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else {
      alert("Můžete nahrát pouze obrázky.");
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPhoto(file);
    } else {
      alert("Můžete vybrat pouze obrázky.");
    }
  };

  const nextStep = () => {
    const formData = new FormData()
    formData.append("image" , photo!)
    axiosInstance.post(`/users/${username}/profile_picture` , formData)
  };

  const skip = () => { 
    onComplete()
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-[100vw] min-h-screen text-white">

      <div className="absolute top-8 left-8 text-sm font-medium text-purple-400">
        2/5
      </div>

      <h1 className="text-2xl font-semibold mb-8">
        Přidat profilovou fotku
      </h1>

      <div
        onClick={() => imageInput.current!.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative bg-purple-500/30 rounded-full h-64 w-64 flex items-center justify-center shadow-lg hover:bg-purple-500/40 cursor-pointer transition ${
          dragActive ? "border-4 border-dashed border-purple-500" : ""
        }`}
      >
        {photo ? (
          <img
            src={URL.createObjectURL(photo)}
            alt="Náhled fotky"
            className="rounded-full h-full w-full object-cover"
          />
        ) : (
          <div className="text-purple-400 text-lg font-medium text-center flex flex-col items-center">
            <DragAndDropImage size={60} />
            <p className="mt-4">Přetáhněte sem obrázek</p>
          </div>
        )}
      </div>

      <label className="mt-8 bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-purple-700 transition cursor-pointer">
        Vybrat z počítače
        <input
          ref={imageInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </label>

      <div className="flex justify-between w-full max-w-md mt-16">
        <button className="text-purple-400 font-medium hover:text-white transition" onClick={skip}>
          Přeskočit
        </button>
        <button
          disabled={!photo}
          onClick={nextStep}
          className={`px-6 py-2 rounded-lg shadow-md transition ${
            photo
              ? "bg-purple-500 text-white hover:bg-purple-600"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          uložit a pokračovat
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
