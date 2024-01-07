import { createSlice } from "@reduxjs/toolkit";

//State Types
interface UserState {
  isLoggedIn: boolean;
  userToken: string | null;
  username: string | null;
  displayName: string | null;
  userId: number | null;
}

//Initial state
const initialState: UserState = {
  isLoggedIn: false,
  userToken: null,
  username: null,
  displayName: null,
  userId: null,
};

//Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.displayName = action.payload.displayName;
      state.userId = action.payload.userId;
      state.userToken = action.payload.userToken;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.displayName = initialState.displayName;
      state.username = initialState.username;
      state.isLoggedIn = initialState.isLoggedIn;
      state.userId = initialState.userId;
      state.userToken = initialState.userToken;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
