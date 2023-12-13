import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  templates: []
}

const templateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTemplates(state, action) {
      const { templates } = action.payload;
     state.templates = templates;
    }
  }
})

export default templateSlice.reducer

export const { setTemplates } = templateSlice.actions

export const getTemplates = (state: {templates: []}) => state.templates;
