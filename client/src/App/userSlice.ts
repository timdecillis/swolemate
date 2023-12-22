import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TemplatesState } from "./Templates/templatesSlice";
import { TemplateType } from "./Templates/TemplateEditor/newTemplateSlice";
import { getTemplates } from "../Utilities/helpers";
import { buildQueries } from "@testing-library/react";

export type State = {
  user: UserState;
  templates: TemplatesState;
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

const signIn = createAsyncThunk('user/signIn',
  async (data: {user: string}) => {
    const response = await getTemplates(data.user);
    console.log('thunk data:', response);
    return response.data;
  }
)

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
  },
  extraReducers: (builder) => {
    builder
    .addCase(signIn.fulfilled, (state, action) => {
      state.signedIn = true;
      console.log('action from extra reducer sign in:', action);
      // state.user = action.payload.user
      return action.payload;
    })
  }
})

export default userSlice.reducer

export const { login, setSignedIn } = userSlice.actions

export const getUser = (state: State) => state.user.user;
export const getSignedIn = (state: State) => state.user.signedIn;