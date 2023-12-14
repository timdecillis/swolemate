import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: null | string;
  signedIn: boolean;
}

const initialState = {
  user: null,
  signedIn: false
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
      const { condition } = action.payload;
     state.signedIn = condition;
    }
  }
})

export default userSlice.reducer

export const { login, setSignedIn } = userSlice.actions

export const getUser = (state: UserState) => state.user;
export const getSignedIn = (state: {user: {signedIn: boolean}}) => state.user.signedIn;