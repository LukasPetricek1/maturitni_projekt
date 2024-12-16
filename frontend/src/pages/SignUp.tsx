import React, { useState, ChangeEvent, FormEvent , useRef } from "react";
import { Link , useSearchParams , useLoaderData , Navigate } from "react-router-dom";

import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";
import Logo from "../components/Logo";
import Modal , { DialogHandle } from "../components/Modal";

import ProfilePhotoUpload from "../components/signup-steps/ProfilePhotoUpload";
import AddUserInfo from "../components/signup-steps/AddUserInfo" 
import WelcomeScreen from "../components/signup-steps/Welcome";

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface LoaderProps{ 
  ["user-credentials"] : FormData | null;
}

const Signup: React.FC = () => {
  const modal = useRef<DialogHandle>(null);

  const loader_data  = useLoaderData() as LoaderProps;

  const [searchParams, setSearchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState(false)

  const ValidFormData =  (formData.email.length > 0 && formData.name.length > 0 && formData.username.length > 0 && formData.password.length > 0)
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDidEdit(true)
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    localStorage.setItem("user-credentials" , JSON.stringify(formData))
    setSearchParams({ step : "upload-profile-picture"})
  };

  const handleCancel = () => { 
      modal.current!.close()
  }

  const handleConfirm = () => {
    if(loader_data && loader_data["user-credentials"]){ 
      setFormData(loader_data["user-credentials"])
    }
    handleCancel()
  }

  if(searchParams.size > 0 && !ValidFormData){
    return <Navigate to="/signup" />
  }

  if(searchParams.get("step") === "upload-profile-picture"){
    return (
      <ProfilePhotoUpload onComplete={() => setSearchParams({ "step" : "add-info"})} />
    )
  }
  if(searchParams.get("step") === "add-info"){
    return (
      <AddUserInfo onComplete={() => setSearchParams({ "step" : "welcome"})} />
    )
  }
  if(searchParams.get("step") === "welcome"){
    return (
      <WelcomeScreen user={{ name : formData.name, username : formData.username}} />
    )
  }


  return (
    <>
    {!didEdit && !ValidFormData && loader_data["user-credentials"] && <Modal
        ref={modal}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        cancelText="Ne"
        confirmText="Ano"
        instant
      >
        <>
          <p className="mb-2 text-lg font-medium">
            Přejete si načíst poslední data?
          </p>
          <p className="mb-4 text-gray-600">pro</p>
          <p className="mb-6 text-gray-800 font-semibold">{loader_data["user-credentials"] && loader_data["user-credentials"].username}</p>
        </>
      </Modal>}
    <div className="flex items-center justify-center h-full">
      <div className="flex w-11/12 max-w-5xl h-4/5 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
        
        <div className={ `flex flex-1 flex-col items-center justify-center registration-background`}>
        <div className="flex justify-center p-5">
          <Logo scale={4} />
        </div>
          <h1 className="text-4xl font-bold text-white">Vítejte</h1>
          <p className="text-gray-300 mt-4 text-center max-w-md">
            Sociální platforma pro všechny, kteří mají rádi technologie
          </p>
        </div>

        
        <div className="flex flex-1 flex-col justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto"
            autoComplete="off"
          >
            <UserInput
              label="Vaše jméno"
              id="name"
              name="name"
              placeholder="Vaše jméno"
              value={formData.name}
              onChange={handleChange}
            />
            <UserInput
              label="Uživatelské jméno"
              id="username"
              name="username"
              placeholder="Vaše uživatelské jméno"
              value={formData.username}
              onChange={handleChange}
            />
            <UserInput
              type="email"
              label="Email"
              id="email"
              name="email"
              placeholder="Váš email"
              value={formData.email}
              onChange={handleChange}
            />
            <UserInput
              type="password"
              label="Vaše heslo"
              id="password"
              name="password"
              placeholder="Vaše heslo"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Další
            </button>
          </form>
          <p className="text-gray-400 text-center mt-4">
            Již máte účet?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Přihlásit se
            </Link>
          </p>
          <div className="mt-6 text-center">
            <p className="text-gray-400">Nebo</p>
            <AlternativeSign />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;

export async function loader(){ 
  let userCredentials = localStorage.getItem("user-credentials") || null;
  if(userCredentials){
    userCredentials = JSON.parse(userCredentials)
  }

  return {
    "user-credentials" : userCredentials || null
  }
}