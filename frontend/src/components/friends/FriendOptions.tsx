import { useState } from "react";
import { FaCog } from "react-icons/fa";

interface FriendOptionsProps {
  onRemoveFriend: () => void;
  onBlockUser: () => void;
  isFriend : boolean
}

const FriendOptions: React.FC<FriendOptionsProps> = ({ onRemoveFriend, onBlockUser , isFriend }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-gray-800 rounded-full">
        <FaCog size={30} color="white" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-2 list-none text-center">
            {isFriend && <li
              className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-red-500"
              onClick={() => {
                onRemoveFriend();
                setIsOpen(false);
              }}
            >
              Odebrat přítele
            </li>}
            <li
              className="px-4 py-2 hover:bg-gray-300 cursor-pointer text-red-600"
              onClick={() => {
                onBlockUser();
                setIsOpen(false);
              }}
            >
              Blokovat uživatele
            </li>
            {isFriend && <li
              className="px-4 py-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Zrušit
            </li>}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FriendOptions;
