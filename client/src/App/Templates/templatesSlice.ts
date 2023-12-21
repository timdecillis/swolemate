import { createSlice } from "@reduxjs/toolkit";

import { TemplateType } from "./TemplateEditor/newTemplateSlice";
import { State } from "../userSlice";

export type TemplatesState = {
  templates: TemplateType[];
  newTemplateOpen: boolean;
  addNameOpen: boolean;
  paletteOpen: boolean;
  newVariableOpen: boolean;
}
const initialState = {
  templates: [],
  newTemplateOpen: false,
  addNameOpen: false,
  paletteOpen: false,
  newVariableOpen: false
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
    },
    setPaletteOpen(state, action) {
      const { condition } = action.payload;
      state.paletteOpen = condition;
    },
    setNewVariableOpen(state, action) {
      const { condition } = action.payload;
      state.newVariableOpen = condition;
    },
    setTemplates(state) {
      console.log('setting templates with:', action.payload);
    }
  }
})

export default templateSlice.reducer

export const { setNewTemplateOpen, setAddNameOpen, setPaletteOpen, setNewVariableOpen, setTemplates } = templateSlice.actions

export const getTemplates = (state: State) => state.templates.templates;
export const getPaletteOpen = (state: State) => state.templates.paletteOpen;
export const getAddNameOpen = (state: State) => state.templates.addNameOpen;
export const getNewTemplateOpen = (state: State) => state.templates.newTemplateOpen;
export const getNewVariableOpen = (state: State) => state.templates.newVariableOpen;