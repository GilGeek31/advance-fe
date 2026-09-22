import { createSlice } from "@reduxjs/toolkit";

// Baca cache dari localStorage saat pertama kali app dimuat
function loadCoursesFromStorage() {
  try {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error("Gagal baca localStorage:", err);
    return [];
  }
}

const initialState = loadCoursesFromStorage();

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      return action.payload;
    },
    addCourseToState: (state, action) => {
      state.unshift(action.payload);
    },
    updateCourseInState: (state, action) => {
      const { id, data } = action.payload;
      const index = state.findIndex((c) => c.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },
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
