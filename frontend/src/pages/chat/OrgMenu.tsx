import React from "react";

import { FaPlus } from "react-icons/fa";
import { Link, Outlet , useParams } from "react-router-dom";

interface channelsProps { 
  org : string;
  channels : { 
    id: number;
    name : string;
    active : boolean;
  }[]
}

const channels : channelsProps[] = [
  {
    org : "arg-1" , 
    channels : [ 
      { id: 1, name: "a-1", active : false },
      { id: 2, name: "b-2", active : false },
    ]
  } , { 
    org : "brg-2" ,
    channels : [
      { id: 3, name: "c-3", active : false },
      { id: 4, name: "d-4", active : false },
      { id: 5, name: "e-5", active : false }
    ]
  } , { 
    org : "crg-3" ,
    channels : [
      { id: 3, name: "c-5", active : false },
      { id: 4, name: "d-6", active : false },
      { id: 5, name: "e-1", active : false }
    ]
  } , { 
    org : "drg-4" ,
    channels : [
      { id: 3, name: "luki", active : false },
      { id: 4, name: "luke", active : false },
      { id: 5, name: "lugy", active : false }
    ]
  } , { 
    org : "erg-5" ,
    channels : [
      { id: 3, name: "aaa", active : false },
      { id: 4, name: "eee", active : false },
      { id: 5, name: "iii", active : false }
    ]
  }
]

const OrgMenu: React.FC = () => {
  const { org_id , channel_id } = useParams()
  const current_channels : channelsProps[]  = channels.filter(channel => channel.org === org_id);
  const CHANNELS = current_channels &&  current_channels[0].channels

  return (
    <>
        <aside className="w-64 bg-purple-900/30 flex flex-col">
          <div className="flex items-center justify-center h-16 bg-purple-800/30 text-white font-semibold">
            {org_id}
          </div>
          <h1 className="self-center text-white p-5 font-normal">*Kanály*</h1>
          <ul className="flex-1 overflow-y-auto space-y-2 p-4">
            {CHANNELS && CHANNELS.map((channel) => (
              <Link key={channel.id} to={`/chat/${org_id}/${channel.name}`}>
                <li
                  key={channel.id}
                  className={`flex items-center gap-3 p-3 rounded-md cursor-pointer ${
                    channel.name === channel_id ? "bg-purple-500 text-white" : "hover:bg-purple-500 hover:text-white transition"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-gray-400"></div>
                  <span>{channel.name}</span>
                </li>
              </Link>
            ))}
            <li className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-300">
              <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                <FaPlus />
              </div>
              <span>Přidat</span>
            </li>
          </ul>
        </aside>

        <Outlet />
    </>
  );
};

export default OrgMenu;
