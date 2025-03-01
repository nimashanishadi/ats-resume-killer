import { configureStore } from "@reduxjs/toolkit";
import userInputReducer from "./slices/userInputSlice";

const Store = configureStore({
  reducer: {
    userInput: userInputReducer,
  },
});

export default Store;
