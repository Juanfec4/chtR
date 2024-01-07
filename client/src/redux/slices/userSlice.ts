import { PayloadAction, createSlice } from "@reduxjs/toolkit";

//State Types
interface UserState {
  isLoggedIn: boolean;
  userToken: string | null;
  username: string | null;
  displayName: string | null;
  userId: number | null;
  avatarSeed: string | null;
}

//Initial state
const initialState: UserState = {
  isLoggedIn: false,
  userToken: null,
  username: null,
  displayName: null,
  userId: null,
  avatarSeed: null,
};

//Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        username: string;
        displayName: string;
        userId: number;
        userToken: string;
        avatarSeed: string;
      }>
    ) => {
      state.username = action.payload.username;
      state.displayName = action.payload.displayName;
      state.userId = action.payload.userId;
      state.userToken = action.payload.userToken;
      state.avatarSeed = action.payload.avatarSeed;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.displayName = null;
      state.username = null;
      state.userToken = null;
      state.userId = null;
      state.avatarSeed = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
