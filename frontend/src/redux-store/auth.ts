import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authProps{ 
  isAuth? : boolean;
  logged? : boolean;
  credentials? : {
    username : string;
    name : string;
    email : string;
    password? : string;
  };
  userInfo? : { 
    id?: number;
    website: string;
    hobbies : string[];
    bio: string;
  }
}

const initialState : authProps = { 
  isAuth : false,
  credentials : { 
    username : "",
    name: "",
    email : "",
    password : "",
  },
  userInfo : { 
    website: "",
    hobbies : [],
    bio : ""
  }
}

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : { 
    register : (state , action : PayloadAction<authProps["credentials"]>) => {
      state.credentials = action.payload;
    } , 
    addUserInfo : (state, action : PayloadAction<authProps["userInfo"]>) => { 
      state.userInfo = action.payload
    },

    login : (state, action : PayloadAction<authProps>) => {
      state.isAuth = true;
      state.logged = true;
      state.credentials = action.payload.credentials
      state.userInfo = action.payload.userInfo
    }, 

    logout: (state) => { 
      delete state.isAuth;
      delete state.credentials;
      delete state.userInfo;

      state.logged = false;
    }
  } 
})

export const { register , addUserInfo , login , logout} = authSlice.actions; 
export default authSlice.reducer;