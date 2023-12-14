import { configureStore } from "@reduxjs/toolkit";

// import typesReducer from './components/HairType/typesSlice'
import userReducer from './App/userSlice'
import templateReducer from './App/Templates/templatesSlice'

export default configureStore({
  reducer: {
    user: userReducer,
    templates: templateReducer
  }
})