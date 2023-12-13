import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  signedIn: false
}

type UserState = {
  user: null | string;
  signedIn: boolean;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    setSignIn(state, action) {
      const { condition } = action.payload;
      if (condition) state.signedIn = true;
      if (!condition) state.signedIn = false;
    }
  }
})

export default userSlice.reducer

export const { login, setSignIn } = userSlice.actions

export const getUser = (state: UserState) => state.user