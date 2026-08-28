import axiosInstance from "./axiosInstance";
import { toFirestoreFields, fromFirestoreDocument } from "./firestoreConverter";

const COLLECTION = "courses";

// GET — ambil semua course
export async function getCourses() {
  const res = await axiosInstance.get(`/${COLLECTION}`);
  const documents = res.data.documents || [];
  return documents.map(fromFirestoreDocument);
}

// ADD — tambah course baru
export async function addCourse(courseData) {
  const res = await axiosInstance.post(`/${COLLECTION}`, {
    fields: toFirestoreFields(courseData),
  });
  return fromFirestoreDocument(res.data);
}

// UPDATE — edit course
export async function updateCourse(id, courseData) {
  await axiosInstance.patch(`/${COLLECTION}/${id}`, {
    fields: toFirestoreFields(courseData),
  });
}

// DELETE — hapus course
export async function deleteCourse(id) {
  await axiosInstance.delete(`/${COLLECTION}/${id}`);
}
