import { AxiosPromise, AxiosResponse } from "axios";
import { createContext } from "react";

export interface AppContextProps {
  setToastInfo: (message: string, type: string) => void;
  toastMessage: string;
  onLike: (target: string, target_id: number, user_id: number) => AxiosPromise<string>;
}

export const AppContext = createContext<AppContextProps>({
  setToastInfo: () => {},
  toastMessage: "",
  onLike: () => Promise.resolve({ 
    data: "", 
    status: 200, 
    statusText: "OK", 
    headers: {}, 
    config: {} 
  } as AxiosResponse<string>) as AxiosPromise<string>
});
