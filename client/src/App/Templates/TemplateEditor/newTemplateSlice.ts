import { createSlice } from "@reduxjs/toolkit";

type NewTemplate = {
  name: string;
  variables: {};
  string: string[]
  addNameOpen: boolean;
  newTemplateOpen: boolean;
}

const initialState: NewTemplate = {
  name: '',
  variables: {},
  string: [],
  addNameOpen: false,
  newTemplateOpen: false
}

const newTemplateSlice = createSlice({
  name: 'newTemplate',
  initialState,
  reducers: {
    addName(state, action) {
      const { name } = action.payload;
      state.name = name;
    },
    setAddNameOpen(state, action) {
      const { condition } = action.payload;
      console.log('condition:', condition)
      state.addNameOpen = condition;
    }
  }
})

export default newTemplateSlice.reducer

export const { addName, setAddNameOpen } = newTemplateSlice.actions

export const addNameOpen = (state: NewTemplate) => state

export const getNewTemplate = (state: NewTemplate) => state;