import React from "react";
import { userProps } from "../pages/Profile";

const AccountSettings: React.FC<{
  onClose: () => void;
  currentData: userProps;
}> = ({ onClose, currentData }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-2xl p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Upravit Profil</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-medium">Profilový Obrázek</label>
            <button className="text-purple-500 font-medium">Upravit</button>
          </div>
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>

          <div className="flex justify-between items-center mt-4">
            <label className="font-medium">Úvodní Fotka</label>
            <button className="text-purple-500 font-medium">Upravit</button>
          </div>
          <div className="w-full h-24 bg-gray-200 rounded-lg mx-auto"></div>

          <section className="flex gap-4">
            <div className="mt-4 ">
              <label className="font-medium">Jméno</label>
              <input
                className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
                placeholder="Popiš se..."
                defaultValue={currentData.name}
              />
            </div>

            <div className="mt-4">
              <label className="font-medium">Uživatelské jméno</label>
              <input
                className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
                placeholder="Popiš se..."
                defaultValue={currentData.username}
              />
            </div>
          </section>

          <div className="mt-4">
            <label className="font-medium">Web</label>
            <input
              type="url"
              defaultValue={currentData.website}
              className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
            />
          </div>

          <div className="mt-4">
            <label className="font-medium">BIO</label>
            <textarea
              rows={3}
              className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
              placeholder="Popiš se..."
              defaultValue={currentData.bio}
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="font-medium">Tagy</label>
            <textarea
              rows={2}
              className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
              placeholder="Přidej tagy..."
            ></textarea>
          </div>

          <button className="mt-6 w-full bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600">
            Odeslat
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
