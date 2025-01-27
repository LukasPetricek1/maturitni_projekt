import React, { useState, ChangeEvent, FormEvent , useRef } from "react";
import { Link , useSearchParams , useLoaderData , Navigate , useNavigate } from "react-router-dom";
// import axios from "axios"

import { useDispatch} from "react-redux";
import { register } from "../redux-store/auth";

import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";
import Logo from "../components/Logo";
// import Modal , { DialogHandle } from "../components/Modal";
// import Toast from "../components/Toast";

import ProfilePhotoUpload from "../components/signup-steps/ProfilePhotoUpload";
import AddUserInfo from "../components/signup-steps/AddUserInfo" 
import WelcomeScreen from "../components/signup-steps/Welcome";
import PasswordCheck from "./PasswordCheck";


// const domain = "http://localhost:3000"

interface FormData {
  name: string;
  username: string;
  email: string;
  password: string;
  specific_id? : string
}

export interface LoaderProps{ 
  ["user-credentials"] : FormData | null;
}

const Signup: React.FC = () => {
  // const navigate = useNavigate()
  // const modal = useRef<DialogHandle>(null);

  // const loader_data  = useLoaderData() as LoaderProps;
  // const has_recorded_id = localStorage.getItem("user-id")

  // const userInfo = useSelector<RootState>(state => state.auth)
  const dispatch = useDispatch()

  // const [showToast, setShowToast] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [secondPassword, setSecondPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
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
    setFormData({ ...formData, [name]: name === "name" ? value : value.trim() });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(validPassword && formData.password === secondPassword){ 
    
      dispatch(register(formData))

      setSearchParams({ step : "upload-profile-picture"})
    }else{ 
      if(!validPassword){ 
        alert("Vaše heslo nesplňuje daná kritéria.")
      }
      alert("Vaše hesla se neshodují.")
    }
  };

  // const handleCancel = () => { 
  //     modal.current!.close()
  // }

  // const handleConfirm = async () => {
  //   // const { email , username, name } = loader_data["user-credentials"]!
  //   // await dispatch(register({ name , username , email }))

  //   navigate("/login")
  //   // navigate("/login")
  //   // if(loader_data && loader_data["user-credentials"]){ 
  //   //   setFormData(prev => {
  //   //     return {
  //   //       ...prev,
  //   //       ...loader_data["user-credentials"]
  //   //     }
  //   //   })
  //   // }
  //   // handleCancel()
  // }

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
    {/* {showToast && <Toast type="success" duration={2000} message="Přihlášení proběhlo úspěšně." onClose={() => setShowToast(false)} />} */}
    {/* {!didEdit && !ValidFormData && <Modal
        ref={modal}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        cancelText="Ne"
        confirmText="Ano"
        instant
      >
        <>
          <p className="mb-2 text-lg font-medium">
            Přejete se přihlásit ?
          </p>
          <p className="mb-4 text-gray-600">jako</p>
          <p className="mb-6 text-gray-800 font-semibold">{loader_data["user-credentials"] && loader_data["user-credentials"].email}</p>
        </>
      </Modal>} */}
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

        
        <div className="flex flex-1 flex-col justify-start p-8 overflow-y-scroll">
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
              maxLength={30}
            />
            <UserInput
              label="Uživatelské jméno"
              id="username"
              name="username"
              placeholder="Vaše uživatelské jméno"
              value={formData.username}
              onChange={handleChange}
              maxLength={15}
            />
            <UserInput
              type="email"
              label="Email"
              id="email"
              name="email"
              placeholder="Váš email"
              value={formData.email}
              onChange={handleChange}
              maxLength={100}
            />
            <PasswordCheck 
              setValid={setValidPassword}
              value={formData.password}
              setValue={e => setFormData(prev => { return { ...prev, password : e.target.value}})}
            />
            <UserInput
              type="password"
              label="Zadejte heslo ještě jednou"
              id="password2"
              name="password2"
              placeholder="Vaše heslo"
              value={secondPassword}
              onChange={e => setSecondPassword(e.target.value.trim())}
              maxLength={30}
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