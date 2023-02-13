import type { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAuthSlice = (state: RootState) => state.authReducer;

// export const selectAccount = createSelector(selectAuthSlice, (s) => s.account);
export const selectAccessToken = createSelector(
  selectAuthSlice,
  (s) => s.accessToken
);

export const selectSessionId = createSelector(
  selectAuthSlice,
  (s) => s.sessionId
);
export const selectRefreshToken = createSelector(
  selectAuthSlice,
  (s) => s.refreshToken
);

// export const selectUserMe = createSelector(selectAuthSlice, (s) => s.userMe);
