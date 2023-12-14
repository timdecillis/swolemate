import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: [],
  newTemplateOpen: false
}

type TemplateType = {
  id: number;
  name: string;
  variables: { [key: string]: string };
  string: (string | string[])[];
}

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    addTemplate: (state, action: { payload: {template: TemplateType}}) => {
      const { template } = action.payload;
      let previous = state.templates;
      // previous.push(template)
    },
    setNewTemplateOpen(state, action) {
      const { condition } = action.payload;
      state.newTemplateOpen = condition;
    }
  }
})

export default templateSlice.reducer

export const { addTemplate } = templateSlice.actions

export const getTemplates = (state: {templates: {templates: any[]}}) => state.templates.templates;
export const getNewTemplateOpen = (state: {templates: {newTemplateOpen: boolean}}) => state.templates.newTemplateOpen;
