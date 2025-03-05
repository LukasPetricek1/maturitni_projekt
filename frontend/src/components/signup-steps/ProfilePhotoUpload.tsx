import React, { useState, useRef , useContext } from "react";
import { RiDragDropLine as DragAndDropImage } from "react-icons/ri";
import axiosInstance from "../../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store";
import { AppContext } from "../../Context/AppContext";

interface Props {
  onComplete: () => void;
}

const ProfilePhotoUpload: React.FC<Props> = ({ onComplete }) => {
  const { setToastInfo } = useContext(AppContext)
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
      setToastInfo("Můžete nahrát pouze obrázky." , "error");
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
      setToastInfo("Můžete nahrát pouze obrázky." , "error");
    }
  };

  const nextStep = async () => {
    const formData = new FormData()
    formData.append("image" , photo!)
    const response = await axiosInstance.post(`/users/${username}/profile_picture` , formData)
    console.log(response)
  };

  const skip = () => { 
    onComplete()
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-[100vw] min-h-screen text-white">

      <div className="absolute text-sm font-medium text-purple-400 top-8 left-8">
        2/5
      </div>

      <h1 className="mb-8 text-2xl font-semibold">
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
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="flex flex-col items-center text-lg font-medium text-center text-purple-400">
            <DragAndDropImage size={60} />
            <p className="mt-4">Přetáhněte sem obrázek</p>
          </div>
        )}
      </div>

      <label className="px-6 py-2 mt-8 text-white transition bg-purple-600 rounded-lg shadow-md cursor-pointer hover:bg-purple-700">
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
        <button className="font-medium text-purple-400 transition hover:text-white" onClick={skip}>
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
