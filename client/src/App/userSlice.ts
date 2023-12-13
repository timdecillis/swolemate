import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

type UserState = {
  user: null | string;
  signedIn: boolean;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action) {
      const { user } = action.payload;
      state.user = user;
    }
  }
})

export default userSlice.reducer

export const { signIn } = userSlice.actions

export const getUser = (state: UserState) => state.user