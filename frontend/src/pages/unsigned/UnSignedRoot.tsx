import React from "react"
import { Outlet } from "react-router-dom"
import MainNavBar from "../../components/MainNavBar"

const UnSignedRoot : React.FC = () => { 
  return (
    <>
      <MainNavBar auth={false} />

      <main className="h-screen -mt-16">
        <Outlet />
      </main>
    </>
  )
}

export default UnSignedRoot