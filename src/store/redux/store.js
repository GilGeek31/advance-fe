import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseReducer";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
  },
});
