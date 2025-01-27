import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../../redux-store/auth";

import { IoIosClose as DeleteIcon } from "react-icons/io";

interface Props {
  onComplete: () => void;
}

export interface HobbiesProps {
  all_hobbies: string[];
  current_hobby: string;
}

const BioForm: React.FC<Props> = ({ onComplete }) => {

  const dispatch = useDispatch()

  const [ website, setWebsite] = useState<string>("")
  const [bio, setBio] = useState<string>("");
  const bioMaxLength = 200;
  const [hobbies, setHobbies] = useState<HobbiesProps>({
    current_hobby: "",
    all_hobbies: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(addUserInfo({
      bio : bio,
      hobbies : hobbies.all_hobbies,
      website : website
    }))
    
    onComplete();
  };

  const handleHobbies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHobbies((prev) => ({
      ...prev,
      current_hobby: e.target.value.trim(),
    }));
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (
      e.key === "Enter" ||
      (e.key === " " && hobbies.current_hobby.length > 0)
    ) {
      e.preventDefault();
      if (hobbies.all_hobbies.indexOf(hobbies.current_hobby) !== -1) {
        setHobbies((prev) => ({
          ...prev,
          current_hobby: "",
        }));
        return;
      }
      setHobbies((prev) => ({
        all_hobbies: prev.all_hobbies.concat(prev.current_hobby),
        current_hobby: "",
      }));
    }
  };

  const deleteHobby = (value: string) => {
    setHobbies((prev) => ({
      ...prev,
      all_hobbies: prev.all_hobbies.filter((hobby) => hobby !== value),
    }));
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-lg p-6 bg-opacity-10 backdrop-blur-md rounded-xl text-white"
      >
        <div className="mb-6">
          <label htmlFor="personalPage" className="block mb-2 text-l text-purple-500">
            Osobní stránka
          </label>
          <input
            type="url"
            id="personalPage"
            className="w-full px-3 py-2 rounded-md bg-transparent text-white border-b-purple-500 border-b-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Vaše osobní stránka"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="hobbies" className="block mb-2 text-l text-purple-500">
            Zájmy <span className="text-gray-400">( odděleno mezerami )</span>
          </label>

          <section className="flex gap-2 flex-wrap p-2 mt-4 mb-4 max-h-24 overflow-y-scroll">
            {hobbies.all_hobbies.map(function (hobby, index) {
              return (
                <span
                  key={index}
                  className="bg-purple-600 rounded-lg p-1 text-white flex gap-1 items-center hover:bg-purple-700"
                >
                  {hobby}
                  <button type="button" onClick={() => deleteHobby(hobby)}>
                    <DeleteIcon size={30} />
                  </button>
                </span>
              );
            })}
          </section>

          <input
            id="hobbies"
            className="w-full px-3 py-2 rounded-md bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Přidejte váš zájem"
            value={hobbies.current_hobby}
            onChange={handleHobbies}
            onKeyDown={handleKey}
          ></input>
        </div>
        <div className="mb-6">
          <label htmlFor="bio" className="block mb-2 text-l text-purple-500">
            BIO - povězte něco o sobě
          </label>
          <textarea
            required
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={bioMaxLength}
            rows={5}
            className="w-full min-h-32 max-h-52 px-3 py-2 rounded-md bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Napište něco o sobě"
          ></textarea>
          <div className="text-right text-sm mt-1">{`${bio.length}/${bioMaxLength}`}</div>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Další
        </button>
      </form>
    </div>
  );
};

export default BioForm;
