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
      console.log('name:', name)
      state.name = name;
    },
    addNewVariable(state, action) {
      const { name, content } = action.payload;
      state.variables[name] = content;
      state.string.push([name])
    },
    addTextToString(state, action) {
      const { text } = action.payload;
      state.string.push(text)
    }
  }
})

export default newTemplateSlice.reducer

export const { addName, addNewVariable, addTextToString } = newTemplateSlice.actions

export const getNewTemplate = (state: State) => state.newTemplate;