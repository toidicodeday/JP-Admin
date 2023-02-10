import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import Cookies from "js-cookie";
import { STORAGE } from "@/utils/constants/storage.constant";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  sessionId: null,
  userId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveLoggedInInfo: (
      state,
      action: PayloadAction<{ userId: string; sessionId: string }>
    ) => {
      Cookies.set(STORAGE.USER_ID, action.payload?.userId);
      Cookies.set(STORAGE.SESSION_ID, action.payload?.sessionId);
      state.sessionId = action.payload?.sessionId;
      state.userId = action.payload?.userId;
    },
    loggedOut: (state) => {
      Cookies.remove(STORAGE.USER_ID);
      Cookies.remove(STORAGE.SESSION_ID);
      state.sessionId = null;
      state.userId = null;
      // window.location.replace('/login')
    },
  },
});

export const { saveLoggedInInfo, loggedOut } = authSlice.actions;

export default authSlice.reducer;
