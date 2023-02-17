import type { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectAuthSlice = (state: RootState) => state.authReducer;

// export const selectAccount = createSelector(selectAuthSlice, (s) => s.account);

export const selectSessionId = createSelector(
  selectAuthSlice,
  (s) => s.sessionId
);

export const selectUserMe = createSelector(selectAuthSlice, s => s.userMe)

