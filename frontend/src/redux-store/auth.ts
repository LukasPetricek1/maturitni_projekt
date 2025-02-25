import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authProps {
  isAuth?: boolean;
  logged?: boolean;
  credentials?: {
    username: string;
    name: string;
    email: string;
    password?: string;
  };
  userInfo?: {
    id?: number;
    website: string;
    hobbies: string[];
    bio: string;
    profile_picture?: string;
    theme_picture?:string;
  };
  invites?: {
    created_at: string;
    id: number;
    sender_email: string;
    sender_id: number;
    sender_name: string;
    sender_profile_picture: string;
    sender_username: string;
  }[];
  friends?: {
    id: number;
    name: string;
    profile_picture: string;
    username: string;
  }[];
  chats?: {
    id: number;
    name: string;
    profile_picture: string;
    username: string;
  }[];
  channels? : {
    id: number;
    name: string;
    organization_id? : number;
    profile_picture?: string;
  }[]
}

export interface chatProps {
  id: number;
  name: string;
  profile_picture: string;
  username: string;
}

const initialState: authProps = {
  isAuth: false,
  credentials: {
    username: "",
    name: "",
    email: "",
    password: "",
  },
  userInfo: {
    website: "",
    hobbies: [],
    bio: "",
    theme_picture : "",
    profile_picture : ""
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<authProps["credentials"]>) => {
      state.credentials = action.payload;
    },
    addUserInfo: (state, action: PayloadAction<authProps["userInfo"]>) => {
      state.userInfo = action.payload;
    },

    updateProfilePicture: (state, action: PayloadAction<string>) => {
      if(state.userInfo){ 
        state.userInfo.profile_picture = action.payload;
      }
    },

    updateThemePicture: (state, action: PayloadAction<string>) => {
      if(state.userInfo){ 
        state.userInfo.theme_picture = action.payload;
      }
    },

    login: (state, action: PayloadAction<authProps>) => {
      state.isAuth = true;
      state.logged = true;
      state.credentials = action.payload.credentials;
      state.userInfo = action.payload.userInfo;
    },

    logout: (state) => {
      delete state.isAuth;
      delete state.credentials;
      delete state.userInfo;

      state.logged = false;
    },

    loadFriends: (state, action: PayloadAction<authProps["friends"]>) => {
      state.friends = action.payload;
    },

    loadInvites: (state, action: PayloadAction<authProps["invites"]>) => {
      state.invites = action.payload;
    },

    clearInvite: (state, action: PayloadAction<number>) => {
      state.invites = state.invites!.filter(
        (invite) => invite.id !== action.payload
      );
    },

    addChat: (state, action: PayloadAction<chatProps>) => {
      state.chats = [...(state.chats ?? []), action.payload];
    },

    updateHobbies : (state, action : PayloadAction<string[]> ) => {
      if(state.userInfo){
        state.userInfo.hobbies = state.userInfo.hobbies.concat(action.payload)
      }
    },

    changeEmail: (state, action : PayloadAction<string>) => { 
      if( state.credentials){
        state.credentials.email = action.payload
      }
    },

    loadChannels : (state, action : PayloadAction<authProps["channels"]>) => { 
      state.channels = [...(state.channels) ?? [], ...action.payload!]
    }
  },
});

export const {
  register,
  addUserInfo,
  login,
  logout,
  loadInvites,
  clearInvite,
  loadFriends,
  addChat,
  updateProfilePicture,
  updateThemePicture,
  updateHobbies,
  changeEmail,
  loadChannels
} = authSlice.actions;
export default authSlice.reducer;
