import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { authProps } from "../redux-store/auth";

import Invitation from "../components/notifications/Invitation";
import Dropdown from "../components/DropDown";

const Notifications: React.FC = () => {

  const invites : authProps["invites"] = useSelector<RootState>(state => state.auth.invites)
  const [notifications, setNotifications] = useState([])

  const updateNotification = (id : number) => { 
    setNotifications(prev => prev.filter(notify => notify.id === id ? notify.read = true : notify))
  }

  const allIsRead = () => { 
    setNotifications(prev => prev.filter(notify => notify.read = true))
  }

  useEffect(() => { 
    if(invites){ 
      console.log(invites)
    }
  }, [invites])

  return (
    <>
    <div className="max-w-3xl p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-white">Notifikace</h1>
        <button className="text-sm text-purple-500 hover:underline" onClick={allIsRead}>
          Označit vše jako přečtené
        </button>
      </div>
      <div className="space-y-4">
        <Dropdown label="Žádosti o přátelství"> 
        {invites && invites.map((invite, index) => {
          
          return (
            <Invitation key={index} {...invite}/>
          )
        })}
        </Dropdown>
      </div>
      {invites && invites!.length === 0 && (
        <div className="mt-10 text-center text-gray-500">
          <p>Nemáte žádné nové notifikace.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Notifications;
