import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth.ts"
import preferencesSlice from "./preferences.ts";

const store = configureStore({
  reducer:{ 
    auth : authSlice,
    preferences : preferencesSlice
  }
})

export default store;