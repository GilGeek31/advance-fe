import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/api/courseApi";
import {
  setCourses,
  addCourseToState,
  updateCourseInState,
  removeCourseFromState,
} from "../store/redux/courseReducer";

export function useCourses() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      dispatch(setCourses(data));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // ADD — panggil fungsi Add API dari services/api
  const createCourse = async (courseData) => {
    const newCourse = await addCourse(courseData);
    dispatch(addCourseToState(newCourse));
  };

  // EDIT — panggil fungsi Edit API dari services/api
  const editCourse = async (id, courseData) => {
    await updateCourse(id, courseData);
    dispatch(updateCourseInState({ id, data: courseData }));
  };

  // DELETE — panggil fungsi Delete API dari services/api
  const removeCourse = async (id) => {
    await deleteCourse(id);
    dispatch(removeCourseFromState(id));
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
