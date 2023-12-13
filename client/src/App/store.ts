import { configureStore } from "@reduxjs/toolkit";

// import typesReducer from './components/HairType/typesSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    user: userReducer
  }
})