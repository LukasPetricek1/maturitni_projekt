import React from "react";

import { IoIosClose as DeleteIcon } from "react-icons/io";
import { HobbiesProps } from "./signup-steps/AddUserInfo";

interface AddHobbiesProps{ 
  hobbies : HobbiesProps;
  setHobbies : React.Dispatch<React.SetStateAction<HobbiesProps>>
}

const AddHobbies: React.FC<AddHobbiesProps> = ({ hobbies , setHobbies}) => {

    const handleHobbies = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHobbies((prev) => ({
        ...prev,
        current_hobby: e.target.value.trim(),
      }));
    };
  
    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <>
      <div className="mb-6">
        <label htmlFor="hobbies" className="block mb-2 text-l text-purple-500">
          Zájmy{" "}
          <span className="text-gray-400">
            ( odděleno mezerami ) - alespoň 3
          </span>
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
    </>
  );
};

export default AddHobbies;