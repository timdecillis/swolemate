import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { saveNewTemplate } from "../../../Utilities/helpers";
import { State } from "../../userSlice";
import { deleteTemplateRequest } from "../templatesSlice";

const instance = axios.create({
  baseURL: 'http://localhost:5000'
});

export type TemplateType = {
  id: number;
  name: string;
  variables: { [key: string]: string };
  string: (string[] | string)[]
}

const initialState: TemplateType = {
  id: 0,
  name: '',
  variables: {},
  string: []
}

const postNewTemplate = createAsyncThunk(
  'newTemplate/saveTemplate',
  async (data: { user: any, template: TemplateType }) => {
    const { user, template } = data;
    const response = await instance.post('/addTemplate', { user, template })
    return response.data;
  });

const newTemplateSlice = createSlice({
  name: 'newTemplate',
  initialState,
  reducers: {
    addExistingTemplate(state, action) {
      const { id, name, variables, string } = action.payload.template;
      state = {
        id,
        name,
        variables,
        string
      }
    },
    addName(state, action) {
      const { name } = action.payload;
      state.name = name;
    },
    addNewVariable(state, action) {
      const { name, content } = action.payload;
      state.variables[name] = content;
      state.string.push([name])
    },
    addExistingVariable(state, action) {
      const { name } = action.payload;
      state.string.push([name])
    },
    addTextToString(state, action) {
      const { text } = action.payload;
      state.string.push(text)
    },
    clearNewTemplate(state) {
      state = {
        id: 0,
        name: '',
        variables: {},
        string: []
      }
    },
    editVariable(state, action) {
      const { prevName, name, content } = action.payload;
      if (prevName) {
        state.string.forEach((item: (string | string[])) => {
          if (Array.isArray(item) && item[0] === prevName) item[0] = name;
        })
        delete state.variables[prevName];
        state.variables[name] = content;
      } else {
        state.variables[name] = content;
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(postNewTemplate.fulfilled, (state, action) => {
      return action.payload;
    })
  }
})

export default newTemplateSlice.reducer

export const { addExistingTemplate, addName, addNewVariable, addTextToString, clearNewTemplate, addExistingVariable, editVariable } = newTemplateSlice.actions

export const getNewTemplate = (state: State) => state.newTemplate;
export { postNewTemplate }