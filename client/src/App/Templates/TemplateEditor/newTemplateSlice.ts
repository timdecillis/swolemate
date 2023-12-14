import { createSlice } from "@reduxjs/toolkit";

export type NewTemplateState = {
  name: string;
  variables: {};
  string: string[]
}

const initialState: NewTemplateState = {
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

export const addNameOpen = (state: NewTemplateState) => state;

export const getNewTemplate = (state: NewTemplateState) => state;