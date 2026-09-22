import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // GET — simpan seluruh data hasil API
    setCourses: (state, action) => {
      return action.payload;
    },
    // ADD — tambah 1 course baru ke state
    addCourseToState: (state, action) => {
      state.unshift(action.payload);
    },
    // EDIT — update 1 course yang cocok id-nya
    updateCourseInState: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex((c) => c.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },
    // DELETE — hapus 1 course yang cocok id-nya
    removeCourseFromState: (state, action) => {
      return state.filter((c) => c.id !== action.payload);
    },
  },
});

export const {
  setCourses,
  addCourseToState,
  updateCourseInState,
  removeCourseFromState,
} = courseSlice.actions;

export default courseSlice.reducer;
