import { createSlice } from "@reduxjs/toolkit";

type NewTemplate = {
  name: string;
  variables: {};
  string: string[]
}

const initialState: NewTemplate = {
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

export const addNameOpen = (state: NewTemplate) => state;

export const getNewTemplate = (state: NewTemplate) => state;