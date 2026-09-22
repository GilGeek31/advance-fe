import { createSlice } from "@reduxjs/toolkit";

// Initial State — array kosong, nanti diisi data dari API
const initialState = [];

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Reducer untuk menangani data hasil API, disimpan ke state global
    setCourses: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;
