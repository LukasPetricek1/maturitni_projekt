import React from "react"
import { useSelector } from "react-redux";
import { RootState } from "./redux-store";
import { authProps } from "./redux-store/auth";
import {useNavigate } from "react-router-dom";


interface Props{ 
  children : JSX.Element
}


const ProtectedRoute : React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const auth = useSelector(( state : RootState) => state.auth as authProps).isAuth;

  if(auth){
    navigate("..")
  }

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute