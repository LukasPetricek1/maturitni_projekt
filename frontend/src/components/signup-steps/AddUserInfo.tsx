import React, { useState , useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../../redux-store/auth";
import AddHobbies from "../AddHobbies";

interface Props {
  onComplete: () => void;
}

export interface HobbiesProps {
  all_hobbies: string[];
  current_hobby: string;
}

const BioForm: React.FC<Props> = ({ onComplete }) => {
  const { setToastInfo } = useContext(AppContext)

  const dispatch = useDispatch();

  const [website, setWebsite] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const bioMaxLength = 200;
  const [hobbies, setHobbies] = useState<HobbiesProps>({
    current_hobby: "",
    all_hobbies: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hobbies.all_hobbies.length < 3) {
      setToastInfo("Musíte napsat alespoň 3 zájmy.","warning");
    } else {
      dispatch(
        addUserInfo({
          bio: bio,
          hobbies: hobbies.all_hobbies,
          website: website,
        })
      );

      onComplete();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-11/12 max-w-lg p-6 bg-opacity-10 backdrop-blur-md rounded-xl text-white"
        >
          <div className="mb-6">
            <label
              htmlFor="personalPage"
              className="block mb-2 text-l text-purple-500"
            >
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
          <AddHobbies hobbies={hobbies} setHobbies={setHobbies} />
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
    </>
  );
};

export default BioForm;
