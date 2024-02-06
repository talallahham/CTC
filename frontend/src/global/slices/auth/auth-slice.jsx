import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAdmin: false,
  isAuth: {
    status: false,
    username: "",
    name: "",
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
