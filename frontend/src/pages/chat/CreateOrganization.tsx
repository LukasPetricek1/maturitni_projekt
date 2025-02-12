import { useState, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { FaUsers, FaUserShield, FaUserPlus } from "react-icons/fa";
import NewChat from "../../components/chat/SearchFriend";
import { chatProps } from "../../redux-store/auth";

export default function CreateOrganization() {
  const { setToastInfo } = useContext(AppContext);
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [members, setMembers] = useState<chatProps[]>([]);
  const [moderators, setModerators] = useState<chatProps[]>([]);
  const [admins, setAdmins] = useState<chatProps[]>([]);
  const [showMenu, setShowMenu] = useState({
    members: false,
    moderators: false,
    admins: false,
  });

  const handleAddUser = (
    where: "members" | "moderators" | "admins",
    user: chatProps
  ) => {
    switch (where) {
      case "members":
        if (!members.some((member) => member.id === user.id)) {
          setMembers((prev) => [...prev, user]);
        } else
          setToastInfo(
            `Uživatele ${user.username} jste už pozvali.`,
            "warning"
          );
        break;

      case "moderators":
        setModerators((prev) => [...prev, user]);
        if (!members.some((member) => member.id === user.id))
          setMembers((prev) => [...prev, user]);
        break;

      case "admins":
        setAdmins((prev) => [...prev, user]);
        if (!members.some((member) => member.id === user.id))
          setMembers((prev) => [...prev, user]);
        break;
    }
  };

  const createOrganization = () => {
    alert("vytvorit organizaci");
  };

  return (
    <div className="w-[90%] h-[90%] m-auto bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Vytvořit organizaci</h2>

      <div>
        <label className="block font-medium text-gray-700">
          Jméno organizace
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mt-1 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          placeholder="Zadejte jméno..."
        />
      </div>

      <div className="flex items-center">
        <input
          id="private"
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
          className="mr-2 w-5 h-5"
        />
        <label htmlFor="private" className="text-gray-700 font-medium">Soukormá organizace</label>
      </div>

      <section className="w-full flex justify-evenly h-[70%] max-h-[70%] overflow-y-scroll">
        <div>
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <FaUsers /> Uživatelé
          </h3>
          <button
            onClick={() =>
              setShowMenu((prev) => ({ ...prev, members: !showMenu.members }))
            }
            className="mt-2 text-purple-600 hover:underline"
          >
            {showMenu.members ? (
              <p>Zavřít</p>
            ) : (
              <p className="flex gap-2 items-center">
                <FaUserPlus /> Pozvat uživatele
              </p>
            )}
          </button>
          {showMenu.members && (
            <NewChat
              onClose={() =>
                setShowMenu((prev) => ({ ...prev, members: false }))
              }
              onComplete={(user) => handleAddUser("members", user)}
              usedOnes={[...members, ...moderators, ...admins]}
            />
          )}
          <ul className="mt-1 space-y-1 p-5">
            {members.map((m, i) => (
              <li key={i} className="text-gray-600">
                {m.name} @{m.username}
              </li>
            ))}
          </ul>
          <hr />
        </div>
        <div>
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <FaUsers /> Moderátoři
          </h3>
          {showMenu.moderators && (
            <NewChat
              onClose={() =>
                setShowMenu((prev) => ({ ...prev, moderators: false }))
              }
              onComplete={(user) => handleAddUser("moderators", user)}
              usedOnes={[...moderators, ...admins]}
            />
          )}
          <button
            onClick={() =>
              setShowMenu((prev) => ({
                ...prev,
                moderators: !showMenu.moderators,
              }))
            }
            className="mt-2 text-purple-600 hover:underline"
          >
            {showMenu.moderators ? (
              <p>Zavřít</p>
            ) : (
              <p className="flex gap-2 items-center">
                <FaUserPlus /> Přidat moderátory
              </p>
            )}
          </button>
          <ul className="mt-1 space-y-1 p-5">
            {moderators.map((m, i) => (
              <li key={i} className="text-gray-600">
                {m.name} @{m.username}
              </li>
            ))}
          </ul>
          <hr />
        </div>
        <div>
          <h3 className="font-medium text-gray-700 flex items-center gap-2">
            <FaUsers /> Admini
          </h3>
          {showMenu.admins && (
            <NewChat
              onClose={() =>
                setShowMenu((prev) => ({ ...prev, admins: false }))
              }
              onComplete={(user) => handleAddUser("admins", user)}
              usedOnes={[...moderators, ...admins]}
            />
          )}
          <button
            onClick={() =>
              setShowMenu((prev) => ({ ...prev, admins: !showMenu.admins }))
            }
            className="mt-2 text-purple-600 hover:underline"
          >
            {showMenu.moderators ? (
              <p>Zavřít</p>
            ) : (
              <p className="flex gap-2 items-center">
                <FaUserPlus /> Přidat adminy
              </p>
            )}
          </button>
          <ul className="mt-1 space-y-1 p-5">
            {admins.map((m, i) => (
              <li key={i} className="text-gray-600">
                ${m.name} @{m.username}
              </li>
            ))}
          </ul>
          <hr />
        </div>
      </section>

      <button
        onClick={createOrganization}
        className="w-full mt-4 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 hover:scale-100"
      >
        Vytvoři organizaci
      </button>
    </div>
  );
}
