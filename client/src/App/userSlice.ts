import { createSlice } from "@reduxjs/toolkit";

import { TemplatesState } from "./Templates/templatesSlice";
import { TemplateType } from "./Templates/TemplateEditor/newTemplateSlice";

export type State = {
  user: UserState;
  templates:TemplatesState;
  newTemplate: TemplateType
}

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

export const getUser = (state: State) => state.user.user;
export const getSignedIn = (state: State) => state.user.signedIn;