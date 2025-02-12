import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ListOfFriends from "../components/friends/ListOfFriends";

import axiosInstance from "../axios/instance";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";

interface User {
  id: number;
  name: string;
  username: string;
  hobbies: string[];
  profilePicture: string;
}

interface HobbiesMenuProps {
  hobbiesData: [string, number][];
  addHobby: (arg: string) => void;
  action: (arg: string) => void;
}

const HobbiesMenu: React.FC<HobbiesMenuProps> = ({
  hobbiesData,
  addHobby,
  action,
}) => {
  return hobbiesData.map(([hobby, count]) => (
    <div
      key={hobby}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
      onClick={() => {
        addHobby(hobby);
        action("");
      }}
    >
      <span>{hobby}</span>
      <span className="text-gray-500 text-sm">{count}</span>
    </div>
  ));
};

interface HobbyInputProps {
  hobbiesData: User["hobbies"];
  selectedHobbies: string[];
  setSelectedHobbies: React.Dispatch<React.SetStateAction<string[]>>;
  addHobby: (arg: string) => void;
  removeHobby: (arg: string) => void;
}

const HobbyInput: React.FC<HobbyInputProps> = ({
  hobbiesData,
  selectedHobbies,
  addHobby,
  removeHobby,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState<string>("");

  // Generování všech unikátních hobby s počty
  const hobbyCounts: Record<string, number> = hobbiesData!.reduce(
    (acc: Record<string, number>, hobby: string) => {
      acc[hobby] = (acc[hobby] || 0) + 1;
      return acc;
    },
    {}
  );

  const sortedHobbyCounts: Record<string, number> = Object.fromEntries(
    Object.entries(hobbyCounts).sort(
      ([, countA], [, countB]) => countB - countA
    )
  );

  const currentHobbies: [string, number][] = [];
  Object.keys(sortedHobbyCounts).filter(function (hobby: string) {
    if (hobby.includes(value) && value.length > 0) {
      currentHobbies.push([hobby, sortedHobbyCounts[hobby]]);
    }
  });

  return (
    <div className="relative w-96 mx-auto mt-10">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedHobbies.map((hobby) => (
          <div
            key={hobby}
            className="px-3 py-1 bg-purple-500 text-white rounded-full cursor-pointer"
            onClick={() => removeHobby(hobby)}
          >
            {hobby}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Vyberte hobby..."
        className={`w-full px-4 py-2 rounded-md bg-transparent border-b-2 ${
          value.length === 0 || currentHobbies.length > 0
            ? "border-purple-500"
            : "border-red-500"
        } outline-none text-white focus:border-2`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
      />
      {isFocused && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg max-h-48 overflow-auto">
          <HobbiesMenu
            hobbiesData={
              currentHobbies.length
                ? currentHobbies
                : Object.entries(sortedHobbyCounts)
            }
            addHobby={addHobby}
            action={setValue}
          />
        </div>
      )}
    </div>
  );
};

// -----------------------------------------------------------------
const DiscoverUsers: React.FC = () => {
  const [selectedHobbiesParams, setSelectedHobbiesParams] = useSearchParams();
  const selected_hobbies = selectedHobbiesParams.get("selected_hobbies");
  const userId = useSelector<RootState>((state) => state.auth.userInfo?.id);

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    selected_hobbies ? selected_hobbies?.split(",") : []
  );

  const [hobbies, setHobbies] = useState([]);
  const [users, setUsers] = useState([]);

  // users.map(function (user: User) {
  //   selectedHobbies.map((hobby) => {
  //     if (user.hobbies?.includes(hobby) && !filteredUsers.includes(user)) filteredUsers.push(user);
  //   });
  // });

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get(
          `/users/discover?selected_hobbies=${selectedHobbies.join(
            ","
          )}&user_id=${userId} `
        )
        .then(({ data }) => {
          console.log(data);
          setUsers(data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedHobbies, userId]);

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get("/hobbies/?user_id=" + userId)
        .then(({ data }) => {
          console.log(data);
          setHobbies(data.map((hobby) => hobby.name));
          // const hobbies = data.reduce((a,b) => a.hobbies.split(",").concat(b.hobbies.split(",")))
          // setHobbies(hobbies)
          // setUsers(data)
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

  const addHobby = (hobby: string) => {
    if (!selectedHobbies.includes(hobby)) {
      setSelectedHobbies([...selectedHobbies, hobby]);

      const newParam =
        selectedHobbiesParams.size > 0 &&
        selectedHobbiesParams.get("selected_hobbies")!.length
          ? selectedHobbiesParams.get("selected_hobbies") + `%2C${hobby}`
          : hobby;
      selectedHobbiesParams.set(
        "selected_hobbies",
        decodeURIComponent(newParam)
      );
      setSelectedHobbiesParams(selectedHobbiesParams);
    }
  };

  const removeHobby = (hobby: string) => {
    setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));

    const selected_hobbies = selectedHobbiesParams.get("selected_hobbies")!;

    if (selectedHobbies.length === 1) {
      selectedHobbiesParams.delete("selected_hobbies");
    } else {
      selectedHobbiesParams.set(
        "selected_hobbies",
        selected_hobbies.slice(0, selected_hobbies.indexOf(hobby) - 1)
      );
    }
    setSelectedHobbiesParams(selectedHobbiesParams);
  };

  return (
    <div className="w-full  mx-auto p-4">
      <h1 className="text-2xl text-purple-500 font-bold text-center mb-6">
        Objevte nové přátele
      </h1>

      <div className="flex justify-center mb-6">
        <HobbyInput
          hobbiesData={hobbies.filter(
            (hobby) => !selectedHobbies.includes(hobby)
          )}
          addHobby={addHobby}
          removeHobby={removeHobby}
          selectedHobbies={selectedHobbies}
          setSelectedHobbies={setSelectedHobbies}
        />
      </div>

      {users.length > 0 ? (
        <section className="w-full grid grid-cols-4 gap-5 px-10">
          <ListOfFriends customFriendsList={users} />
        </section>
      ) : (
        <p className="text-center text-gray-500">
          Nikoho jsme bohužel nenašli.
        </p>
      )}
    </div>
  );
};

export default DiscoverUsers;
