import React from "react"
import { Outlet } from "react-router-dom"

import classes from "./root.module.css"

const Root : React.FC = () => { 
  return (
    <>
      <h1 className={classes.beta}>Beta</h1>
      <Outlet />
    </>
  )
}

export default Root