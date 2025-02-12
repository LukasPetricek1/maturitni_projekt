import { createContext } from "react"

interface SetToastInfo{ 
  setToastInfo : (message : string, type : string) => void
}

export const AppContext = createContext<SetToastInfo>({ setToastInfo : () => {}})