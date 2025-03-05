import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link , useSearchParams , Navigate } from "react-router-dom";

import { useDispatch} from "react-redux";
import { register } from "../redux-store/auth";

import UserInput from "../components/UserInput";
import AlternativeSign from "../components/AlternativeSign";
import Logo from "../components/Logo";
import Toast from "../components/Toast";

import AddUserInfo from "../components/signup-steps/AddUserInfo" 
import WelcomeScreen from "../components/signup-steps/Welcome";
import PasswordCheck from "./PasswordCheck";
import InputCheck from "./InputCheck";
import axiosInstance from "../axios/instance";


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
  const dispatch = useDispatch()

  const [toastInfo, setToastInfo] = useState({
    message: "",
    type: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [secondPassword, setSecondPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [valid, setValid] = useState({ 
      username : true,
      name : true
    })

  const ValidFormData =  (formData.email.length > 0 && formData.name.length > 0 && formData.username.length > 0 && formData.password.length > 0)
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "name" ? value : value.trim() });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    let ok = true

    await axiosInstance.get("/username/exists?username="+formData.username)
    .then(({ data }) => { 
      if(data.error){ 
        if(data.error === "username_exists"){ 
          setToastInfo({ message : `Uživatelské jméno ${formData.username} už existuje.` , type : "error"})
          ok = false
        }
      }
    })

    await axiosInstance.get("/email/exists?email="+formData.email)
      .then(({ data }) => { 
        if(data.error){ 
          if(data.error === "email_exists"){ 
            setToastInfo({ message : `Email ${formData.email} už existuje.` , type : "error"})
            ok = false
          }
        }
      })

    if(ok && valid.username && valid.name && validPassword && formData.password === secondPassword){ 
    
      dispatch(register(formData))

      setSearchParams({ step : "add-info"})
    }else{ 
      if(!valid.name){
        setToastInfo({ message : "Vaše jméno nesplňuje daná kritéria." , type : "error"})
      }
      else if(!valid.username){
        setToastInfo({ message : "Vaše uživatelské jméno nesplňuje daná kritéria." , type : "error"})
      }
      else if(!validPassword){ 
        setToastInfo({ message : "Vaše heslo nesplňuje daná kritéria." , type : "error"})
      }
      else if(formData.password !== secondPassword){ 
        setToastInfo({ message : "Vaše hesla se neshodují" , type : "error"})
      }
    }
  };

  if(searchParams.size > 0 && !ValidFormData){
    return <Navigate to="/signup" />
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

  const closeToast = () => { 
    setToastInfo({
      message :"",
      type :""
    })
  }


  return (
    <>

    {toastInfo.message && toastInfo.type && (
              <Toast
                message={toastInfo.message}
                type={toastInfo.type}
                onClose={closeToast}
              />
      )}
    <div className="flex items-center justify-center w-screen h-full">
      <div className="flex w-11/12 max-w-5xl overflow-hidden bg-gray-900 rounded-lg shadow-lg h-4/5">
        
        <div className={ `flex flex-1 flex-col items-center justify-center registration-background`}>
        <div className="flex justify-center p-5">
          <Logo scale={4} />
        </div>
          <h1 className="text-4xl font-bold text-white">Vítejte</h1>
          <p className="max-w-md mt-4 text-center text-gray-300">
            Sociální platforma pro všechny, kteří mají rádi technologie
          </p>
        </div>

        
        <div className="flex flex-col justify-start flex-1 p-8 overflow-y-scroll">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto"
            autoComplete="off"
          >

            <InputCheck 
              type="text"
              id="name"
              label="Vaše jméno"
              maxLength={45}
              name="name"
              placeholder="Vaše jméno"
              setValue={value => setFormData(prev => { return { ...prev , name : value}})}
              value={formData.name}
              version={"dark"}
              setValid={(name, state) => setValid(prev => {
                return {
                  ...prev,
                  [name] : state
                }
              })}
            />
            <InputCheck 
              type="text"
              id="username"
              label="Uživatelské jméno"
              maxLength={45}
              name="username"
              placeholder="Uživatelské jméno"
              setValue={value => setFormData(prev => { return { ...prev , username : value}})}
              value={formData.username}
              version={"dark"}
              setValid={(name, state) => setValid(prev => {
                return {
                  ...prev,
                  [name] : state
                }
              })}
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
              version={"dark"}
            />
            <PasswordCheck 
              setValid={setValidPassword}
              value={formData.password}
              setValue={value => setFormData(prev => { return { ...prev, password : value}})}
            />
            <UserInput
              type="password"
              label="Zadejte heslo ještě jednou"
              id="password2"
              name="password2"
              placeholder="Vaše heslo"
              value={secondPassword}
              onChange={e => setSecondPassword(e.target.value.trim())}
              maxLength={60}
              version={"dark"}
            />
            <button
              type="submit"
              className="w-full py-2 text-white transition bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Další
            </button>
          </form>
          <p className="mt-4 text-center text-gray-400">
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