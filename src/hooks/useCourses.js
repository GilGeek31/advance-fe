import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/api/courseApi";
import { setCourses } from "../store/redux/courseReducer";

export function useCourses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses); // ← baca dari Redux store
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      dispatch(setCourses(data)); // ← simpan hasil API ke Redux store
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const createCourse = async (courseData) => {
    const newCourse = await addCourse(courseData);
    dispatch(setCourses([newCourse, ...courses]));
  };

  const editCourse = async (id, courseData) => {
    await updateCourse(id, courseData);
    const updated = courses.map((c) =>
      c.id === id ? { ...c, ...courseData } : c,
    );
    dispatch(setCourses(updated));
  };

  const removeCourse = async (id) => {
    await deleteCourse(id);
    dispatch(setCourses(courses.filter((c) => c.id !== id)));
  };

  return {
    courses,
    isLoading,
    error,
    createCourse,
    editCourse,
    removeCourse,
    refetch: fetchCourses,
  };
}
