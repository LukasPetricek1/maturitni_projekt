import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth.ts"
import preferencesSlice from "./preferences.ts";

export const store = configureStore({
  reducer:{ 
    auth : authSlice,
    preferences : preferencesSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;