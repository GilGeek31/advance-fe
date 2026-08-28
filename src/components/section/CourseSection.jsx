import { useState } from "react";
import { Plus } from "lucide-react";
import CategoryTabs from "../section/CategoryTabs";
import CourseCard from "../section/CourseCard";
import CourseFormModal from "../ui/CourseFormModal";
import { useCourses } from "../../hooks/useCourses";

const categories = [
  "Semua Kelas",
  "Pemasaran",
  "Desain",
  "Pengembangan Diri",
  "Bisnis",
];

export default function CourseSection({ sectionRef }) {
  const { courses, isLoading, error, createCourse, editCourse, removeCourse } =
    useCourses();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  //create
  const handleAddClict = () => {
    setEditingCourse(null);
    setisModalOpen(true);
  };

  //edit
  const handleEditClick = (id) => {
    const course = courses.find((c) => c.id === id);
    setEditingCourse(course);
    setisModalOpen(true);
  };

  //delete
  const handleDeleteClick = async (id) => {
    if (confirm("yakin mau hapus course ini?")) {
      await removeCourse(id);
    }
  };

  //submit
  const handleFormSubmit = async (formdata) => {
    if (editingCourse) {
      await editCourse(editingCourse.id, formdata);
    } else {
      await createCourse(formdata);
    }
  };

  if (isLoading)
    return <p className="text-center py-10">Memuat data course...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-error-default">
        Gagal memuat data course.
      </p>
    );

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full max-w-300 px-4 md:px-4 mt-5 md:mt-16 "
      >
        <div className="md:text-center mb-6">
          <h2 className="font-heading text-heading-4 md:text-heading-3 text-text-dark-primary">
            Koleksi Video Pembelajaran Unggulan
          </h2>
          <p className="text-body-sm md:text-body-md text-text-dark-secondary mt-3">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>

        <CategoryTabs categories={categories} onChange={setActiveCategory} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 justify-items-center">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              {...course}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      </section>
      <button
        onClick={handleAddClict}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full 
        bg-primary-100 text-white
        shadow-[0_0_15px_3px_rgba(34,197,94,0.6),0_0_30px_8px_rgba(34,197,94,0.4)]
        hover:shadow-[0_0_20px_5px_rgba(34,197,94,0.8),0_0_40px_12px_rgba(34,197,94,0.5)]
        flex items-center justify-center transition-shadow duration-300"
      >
        <Plus size={20} md:size={40} strokeWidth={2} />
      </button>
      <CourseFormModal
        isOpen={isModalOpen}
        onClose={() => setisModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCourse}
      />
    </>
  );
}
