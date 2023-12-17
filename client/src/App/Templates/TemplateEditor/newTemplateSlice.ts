import { createSlice } from "@reduxjs/toolkit";
import { State } from "../../userSlice";

export type TemplateType = {
  id: number;
  name: string;
  variables: {[key: string]: string};
  string: (string[]|string)[]
}

const initialState: TemplateType = {
  id: 0,
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
      state.id = initialState.id;
      state.name = initialState.name;
      state.variables = initialState.variables;
      state.string = initialState.string;
    },
    editVariable(state, action) {
      const {prevName, name, content} = action.payload;
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
  }
})

export default newTemplateSlice.reducer

export const { addName, addNewVariable, addTextToString, clearNewTemplate, addExistingVariable, editVariable } = newTemplateSlice.actions

export const getNewTemplate = (state: State) => state.newTemplate;