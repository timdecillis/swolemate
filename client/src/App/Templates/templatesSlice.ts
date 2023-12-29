import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { signIn } from "../userSlice";
import { TemplateType, postNewTemplate } from "./TemplateEditor/newTemplateSlice";
import { State } from "../userSlice";
import { deleteTemplate } from "../../Utilities/helpers";

export type TemplatesState = {
  templates: TemplateType[];
  newTemplateOpen: boolean;
  addNameOpen: boolean;
  paletteOpen: boolean;
  newVariableOpen: boolean;
  loading: boolean;
}
const initialState = {
  templates: [],
  newTemplateOpen: false,
  addNameOpen: false,
  paletteOpen: false,
  newVariableOpen: false,
  loading: false
}

const deleteTemplateRequest = createAsyncThunk(
  'template/deleteTemplate',
  async (data: { id: number, user: string | null }) => {
    const { id, user } = data;
    const response = await deleteTemplate(id, user);
    return response;
  }
)

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
    setTemplates(state, action) {
      state.templates = action.payload;
    },
    deleteTemplates(state, action) {
      state.templates = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(postNewTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload.data;
      })
      .addCase(deleteTemplateRequest.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTemplateRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.templates = action.payload.templates;
      })
  },
})

export default templateSlice.reducer

export const { setNewTemplateOpen, setAddNameOpen, setPaletteOpen, setNewVariableOpen, setTemplates, deleteTemplates } = templateSlice.actions

export { deleteTemplateRequest };

export const getTemplates = (state: State) => state.templates.templates;
export const getPaletteOpen = (state: State) => state.templates.paletteOpen;
export const getAddNameOpen = (state: State) => state.templates.addNameOpen;
export const getNewTemplateOpen = (state: State) => state.templates.newTemplateOpen;
export const getNewVariableOpen = (state: State) => state.templates.newVariableOpen;
export const getLoading = (state: State) => state.templates.loading;