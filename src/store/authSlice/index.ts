import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import Cookies from "js-cookie";
import { STORAGE } from "@/utils/constants/storage.constant";

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuthToken: (state, action: PayloadAction<{ [key: string]: any }>) => {
      const { accessToken, refreshToken } = action.payload;
      Cookies.set(STORAGE.ACCESS_TOKEN, accessToken);
      Cookies.set(STORAGE.REFRESH_TOKEN, refreshToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    loggedOut: (state) => {
      Cookies.remove(STORAGE.ACCESS_TOKEN);
      Cookies.remove(STORAGE.REFRESH_TOKEN);
      state.accessToken = initialState.accessToken;
      state.refreshToken = initialState.refreshToken;
      // window.location.replace('/login')
    },
  },
});

export const { saveAuthToken, loggedOut } = authSlice.actions;

export default authSlice.reducer;
