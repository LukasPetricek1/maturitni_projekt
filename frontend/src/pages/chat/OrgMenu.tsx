import React from "react";

import { FaPlus } from "react-icons/fa";
import { Outlet , useParams } from "react-router-dom";

const OrgMenu: React.FC = () => {
  const { org_id  } = useParams()

  return (
    <>
        <aside className="flex flex-col w-64 bg-purple-900/30">
          <div className="flex items-center justify-center h-16 font-semibold text-white bg-purple-800/30">
            {org_id}
          </div>
          <h1 className="self-center p-5 font-normal text-white">*Kanály*</h1>
          <ul className="flex-1 p-4 space-y-2 overflow-y-auto">
            
            <li className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-gray-300">
              <div className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full">
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
