import { createSlice } from "@reduxjs/toolkit";

interface authProps{ 
  isAuth : boolean;
}

const initialState : authProps = { 
  isAuth : false
}

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : { 
    login(){ 

    },
    logout(){ 

    }
  }
})

export const { login , logout } = authSlice.actions; 
export default authSlice.reducer;