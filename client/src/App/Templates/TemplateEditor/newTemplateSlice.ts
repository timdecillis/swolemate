import { createSlice } from "@reduxjs/toolkit";
import { State } from "../../userSlice";

export type TemplateType = {
  id: number;
  name: string;
  variables: {};
  string: string[]
}

const initialState: TemplateType = {
  id: 0,
  name: '',
  variables: {},
  string: []
}

const newTemplateSlice = createSlice({
  name: 'newTemplate',
  initialState,
  reducers: {
    addName(state, action) {
      const { name } = action.payload;
      state.name = name;
    }
  }
})

export default newTemplateSlice.reducer

export const { addName } = newTemplateSlice.actions

export const getNewTemplate = (state: State) => state.newTemplate;