import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload.user;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
