import { createSlice } from "@reduxjs/toolkit";

import { State } from "../userSlice";

export type TemplatesState = {
  templates: any[];
  newTemplateOpen: boolean;
  addNameOpen: boolean;
}
const initialState = {
  templates: [],
  newTemplateOpen: false,
  addNameOpen: false
}

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setNewTemplateOpen(state, action) {
      const { condition } = action.payload;
      state.newTemplateOpen = condition;
    },
    setAddNameOpen(state, action) {
      const { condition } = action.payload;
      state.addNameOpen = condition;
    }
  }
})

export default templateSlice.reducer

export const { setNewTemplateOpen, setAddNameOpen } = templateSlice.actions

export const getTemplates = (state: State) => state.templates.templates;
export const addNameOpen = (state: State) => state.templates.addNameOpen;
export const getNewTemplateOpen = (state: State) => state.templates.newTemplateOpen;