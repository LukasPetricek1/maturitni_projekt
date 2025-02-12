import React, { useEffect, useState } from "react";

import { notifications as NOTIFICATIONS } from "../data/notifications";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store";
import { authProps } from "../redux-store/auth";

import Invitation from "../components/notifications/Invitation";
import Dropdown from "../components/DropDown";

const Notifications: React.FC = () => {

  const invites : authProps["invites"] = useSelector<RootState>(state => state.auth.invites)
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

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
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-white">Notifikace</h1>
        <button className="text-sm text-purple-500 hover:underline" onClick={allIsRead}>
          Označit vše jako přečtené
        </button>
      </div>
      <div className="space-y-4">
        {/* {notifications.map((notification) => (
          <button
          disabled={notification.read}
          onClick={() => updateNotification(notification.id)}
            key={notification.id}
            className={`flex items-center p-4 border rounded-lg w-full ${
              notification.read ? "bg-gray-400" : "bg-white shadow"
            }`}
          >
            <div className="flex-shrink-0 mr-4 text-2xl">{notification.icon}</div>
            <div>
              <p className="text-gray-700">{notification.message}</p>
              <p className="text-sm text-gray-500">{notification.time}</p>
            </div>
          </button>
        ))} */}
        <Dropdown label="Žádosti o přátelství"> 
        {invites && invites.map((invite, index) => {
          
          return (
            <Invitation key={index} {...invite}/>
          )
        })}
        </Dropdown>
      </div>
      {invites && invites!.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          <p>Nemáte žádné nové notifikace.</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Notifications;
