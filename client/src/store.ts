import { configureStore } from "@reduxjs/toolkit";

import userReducer from './App/userSlice'
import templatesReducer from './App/Templates/templatesSlice'
import newTemplateReducer from "./App/Templates/TemplateEditor/newTemplateSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    templates: templatesReducer,
    newTemplate: newTemplateReducer
  }
})