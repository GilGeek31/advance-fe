import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./courseReducer";

export const store = configureStore({
  reducer: {
    courses: courseReducer,
  },
});

// Setiap kali state berubah (create/edit/delete/get), otomatis simpan ke localStorage
store.subscribe(() => {
  try {
    localStorage.setItem("courses", JSON.stringify(store.getState().courses));
  } catch (err) {
    console.error("Gagal simpan ke localStorage:", err);
  }
});
