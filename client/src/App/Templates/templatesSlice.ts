import { createSlice } from "@reduxjs/toolkit";

type TemplatesState = {
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

export const getTemplates = (state: TemplatesState) => state.templates;
export const addNameOpen = (state: TemplatesState) => state.addNameOpen;
export const getNewTemplateOpen = (state: TemplatesState) => state.newTemplateOpen;