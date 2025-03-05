import React, { useState, useRef, useEffect , useContext, SetStateAction } from "react";
import { format } from "date-fns";
import { BsThreeDotsVertical as SettingsIcon } from "react-icons/bs";
import { AppContext } from "../../Context/AppContext";

import { MdContentCopy as CopyIcon , MdDeleteOutline  as DeleteIcon, MdEdit as EditIcon , MdOutlineReply as ReplyIcon , MdOutlineReportGmailerrorred as ReportIcon } from "react-icons/md";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { MessageProps } from "../../pages/chat/DirectChat";

interface Props{
  message: MessageProps,
  user_id: number;
  myMessage: boolean;
  setIsEditing?: React.Dispatch<SetStateAction<boolean>>
}


const MessageOptions : React.FC<Props> = ({ message, user_id , myMessage , setIsEditing, handleDelete }) => {
  const { setToastInfo , toastMessage } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Funkce pro zavření menu při kliknutí mimo
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const copyMessage = async (msg : string) => { 
    try{ 
      navigator.clipboard.writeText(msg)
      if(!toastMessage) setToastInfo("Zpráva byla úspěšně zkopírována" , "success")
    }catch(err){ 
      if(!toastMessage && err) setToastInfo("Zpráva nešla zkopírovat" , "error")
    }

    setIsOpen(false)
  }

  const reportMessage = (msg : string) => { 
    if(!toastMessage) setToastInfo(`Zpráva : "${msg.slice(0,20)}..." byla úspěšně nahlášena` , "warning")

      setIsOpen(false)
  }

  const updateMessage = (msg : string) => { 
    
    setIsEditing(true)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <SettingsIcon />
      </button>

      {isOpen && (
        <div ref={menuRef} className={`absolute w-40 bg-white rounded-md shadow-lg ${myMessage ? "right-5" : "left-5"} translate-y-[-50%]`}>
          <p className="text-sm font-light text-center text-black">{format(new Date(message.created_at), "dd.M - HH:mm")}</p>
          <button className="flex items-center w-full gap-2 p-2 text-center hover:bg-purple-300 hover:scale-100" onClick={() => copyMessage(message.content)}>
            <CopyIcon color="purple" /> Zkopírovat
          </button>
          {myMessage && <button className="flex items-center w-full gap-2 p-2 text-center hover:bg-purple-300 hover:scale-100" onClick={() => updateMessage(message.content)}>
            <EditIcon color="purple" /> Upravit
          </button>}
          {myMessage && <button className="flex items-center w-full gap-2 p-2 text-center hover:bg-purple-300 hover:scale-100" onClick={() => handleDelete(message.id)}>
            <DeleteIcon color="purple" /> Odstranit
          </button>}
          {!myMessage && <button className="flex items-center w-full gap-2 p-2 text-center hover:bg-purple-300 hover:scale-100" onClick={() => reportMessage(message.content)}>
            <ReportIcon color="purple" /> Nahlásit
          </button>}
          <button className="flex items-center w-full gap-2 p-2 text-center hover:bg-purple-300 hover:scale-100" onClick={() => setIsOpen(false)}>
            <CloseIcon color="purple" /> Zavřít
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageOptions;
