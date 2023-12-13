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
    setSignedIn(state, action) {
      console.log('setting signedIn!')
      const { condition } = action.payload;
      if (condition) state.signedIn = true;
      if (!condition) state.signedIn = false;
    }
  }
})

export default userSlice.reducer

export const { login, setSignedIn } = userSlice.actions

export const getUser = (state: UserState) => state.user