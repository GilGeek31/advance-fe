import { useState, useEffect, useCallback } from "react";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/api/courseApi";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const createCourse = async (courseData) => {
    const newCourse = await addCourse(courseData);
    setCourses((prev) => [newCourse, ...prev]);
  };

  const editCourse = async (id, courseData) => {
    await updateCourse(id, courseData);
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...courseData } : c)),
    );
  };

  const removeCourse = async (id) => {
    await deleteCourse(id);
    setCourses((prev) => prev.filter((c) => c.id !== id));
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
