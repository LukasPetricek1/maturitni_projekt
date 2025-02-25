import {  format } from "date-fns";
import { useState , useContext } from "react";
import MessageOptions from "./MessageMenu";
import axiosInstance from "../../axios/instance";
import { AppContext } from "../../Context/AppContext";

const ChatMessage = ({ message, user_id, updateMessage, showTimestamp , deleteMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(message.content);
  const { setToastInfo } = useContext(AppContext)

  const handleSave = () => {
    updateMessage(message.id, newContent);
    setIsEditing(false);
  };

  const handleDelete = async (id : number) => { 
    const confirmation = confirm("Opravdu chcete zprávu odstranit ?")
    if(confirmation){ 
      try{ 
        const { data } = await axiosInstance.delete("/direct-chat/delete-message/"+id)
        console.log(data)
        if(data.affectedRows){ 
          setToastInfo("Zpráva byla úspěšně smazána" , "success")
          deleteMessage(id)
        }
      }catch(err){ 
        if(err) setToastInfo("Zpráva se nepovedla smazat." , "error")
      }
    }
  }
 
  const myMessageStyle = "self-end";
  const foreignMessageStyle = "self-start";

  return (
    <>
      {showTimestamp && (
        <p className="text-xs font-light">
          {format(new Date(message.created_at), "dd.M - HH:mm")}
        </p>
      )}
      <div
        className={`flex items-center gap-2  ${
          message.user_id === user_id ? myMessageStyle : foreignMessageStyle
        }`}
      >
        {!message.removed && message.user_id === user_id && (
          <MessageOptions
            key={1}
            message={message}
            user_id={user_id}
            myMessage={true}
            setIsEditing={setIsEditing}
            handleDelete={handleDelete}
          />
        )}
        <section className="flex flex-col gap-2">
          {!message.removed && message.updated_at && <p className="text-xs font-light">Upraveno - {format(new Date(message.updated_at), "dd.M - HH:mm")}</p>}
          <section
            key={message.id}
            className={`p-2 text-sm rounded-md ${
              !message.removed && message.user_id === user_id && "bg-purple-800 text-white"
            } 
            
            ${!message.removed && message.user_id !== user_id && "bg-purple-500 text-white"}
            ${message.removed && "bg-gray-700"}`}
          >
            <p>{!message.removed ? message.content : "Smazáno"}</p>
            {isEditing && (
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  className="w-full p-1 text-black border rounded outline-none"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <button
                  onClick={handleSave}
                  className="px-3 py-1 text-white rounded"
                >
                  Upravit
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-white bg-purple-500 rounded"
                >
                  Zahodit
                </button>
              </div>
            )}
          </section>
        </section>

        {!message.removed && message.user_id !== user_id && (
          <MessageOptions
            key={2}
            message={message}
            user_id={user_id}
            myMessage={false}
          />
        )}
      </div>
    </>
  );
};

export default ChatMessage;
