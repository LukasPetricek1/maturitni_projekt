import { createSlice } from "@reduxjs/toolkit";

interface initialProps{ 
  theme : "dark" | "light";
  language : "czech" | "english";
}

const initialState : initialProps = { 
  theme : "dark",
  language : "czech"
}

const preferencesSlice = createSlice({ 
  name : "preferences",
  initialState,
  reducers : {
    setTheme(state, action : { payload : initialProps["theme"]}){ 
      state.theme = action.payload;
    },
    setLanguage(state, action : { payload : initialProps["language"]}){ 
      state.language = action.payload;
    }
  }
})

export const { setTheme , setLanguage } = preferencesSlice.actions;
export default preferencesSlice.reducer;