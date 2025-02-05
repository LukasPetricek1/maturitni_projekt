import React, { ChangeEvent, useState } from "react";
import { userProps } from "../pages/Profile";
import InputCheck from "../pages/InputCheck";

const AccountSettings: React.FC<{
  onClose: () => void;
  initialData: userProps;
}> = ({ onClose, initialData }) => {
  const [userData, setUserData] = useState<userProps>(initialData);
  const [valid, setValid] = useState({ 
    name : true, 
    username : true,
    web : true
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {

    setUserData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const resetData = () => { 
    setUserData(initialData)
  }

  const send = () => { 
    const { name , username , web } =valid;
    if(name && username && web){ 
      console.log("Can send")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-h-[95%] w-11/12 max-w-2xl p-6 overflow-y-scroll">
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

          <section className="flex gap-4 w-full">

            <div className="mt-4 w-full">
              <InputCheck 
                type="text"
                id="username"
                label="Uživatelské jméno"
                maxLength={45}
                name="username"
                placeholder="Uživatelské jméno"
                setValue={value => setUserData(prev => { return { ...prev , username : value}})}
                value={userData.username}
                version={"light"}
                setValid={(name, state) => setValid(prev => {
                  return {
                    ...prev,
                    [name] : state
                  }
                })}
              />
            </div>

            <div className="mt-4 w-full">
              <InputCheck 
                  type="text"
                  id="name"
                  label="Jméno"
                  maxLength={45}
                  name="name"
                  placeholder="Jméno"
                  setValue={value => setUserData(prev => { return { ...prev , name : value}})}
                  value={userData.name}
                  version={"light"}
                  setValid={(name, state) => setValid(prev => {
                    return {
                      ...prev,
                      [name] : state
                    }
                  })}
                />
            </div>
          </section>

          <div className="mt-4">
          <InputCheck 
                  type="url"
                  id="web"
                  label="Web"
                  maxLength={100}
                  name="web"
                  placeholder="Web ..."
                  setValue={value => setUserData(prev => { return { ...prev , website : value}})}
                  value={userData.website}
                  version={"light"}
                  setValid={(name, state) => setValid(prev => {
                    return {
                      ...prev,
                      [name] : state
                    }
                  })}
                />
          </div>

          <div className="mt-4">
            <label className="font-medium">BIO</label>
            <textarea
              rows={3}
              className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
              placeholder="Popiš se..."
              value={userData.bio}
              name="bio"
              onChange={handleChange}
              maxLength={250}
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="font-medium">Koníčky</label>
            <textarea
              rows={2}
              className="mt-1 w-full border rounded-lg px-4 py-2 border-purple-500"
              placeholder="Přidej své koníčky..."
              name="hobbies"
            ></textarea>
          </div>

          <div className="flex gap-8">
            <button type="button" onClick={resetData} className="mt-6 w-full text-lg font-black text-purple-500 border border-purple-500 rounded-lg py-2">
              Resetovat
            </button>
            <button className="mt-6 w-full bg-purple-500 text-white rounded-lg py-2 hover:bg-purple-600" onClick={send}>
              Odeslat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
