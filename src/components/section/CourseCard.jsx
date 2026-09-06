import Rating from "../ui/Rating";
import { Pencil, Trash2 } from "lucide-react";

export default function CourseCard({
  id,
  thumbnail,
  title,
  description,
  instructor,
  rating,
  price,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="relative group flex w-full flex-col items-center mb-2 p-3 max-w-[384px] md:block bg-white
     rounded-xl border border-border hover:shadow-md transition-shadow"
    >
      <div className="flex flex-row gap-2 md:flex-col md:justify-center md:gap-0">
        <div className="absolute top-2 right-3 lg:top-5 lg:right-3.5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-50">
          <button
            onClick={() => onEdit(id)}
            className=" bg-white rounded-full p-1.5 shadow hover:bg-grey-50 "
            aria-label="Edit Course"
          >
            <Pencil size={14} className="text-grey-700" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className=" bg-white p-1.5 rounded-full shadow hover:bg-error-bg "
            aria-label="Hapus Course"
          >
            <Trash2 size={14} className=" text-error-default" />
          </button>
        </div>
        <img
          src={thumbnail}
          alt={title}
          className=" shrink-0 rounded-xl w-21 h-21 md:w-86 md:h-48 mb-2 object-cover"
        />

        <div className="flex flex-col gap-1">
          <h3 className=" font-heading text-heading-7 md:text-heading-6 text-text-dark-primary line-clamp-2">
            {title}
          </h3>
          <p className="hidden description-clamp md:block text-body-sm md:text-body-md font-normal text-text-dark-secondary">
            {description}
          </p>

          <div className="flex gap-2 mt-1">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-9 h-9 rounded-lg object-cover"
            />
            <div>
              <p className="text-body-sm sm:text-body-md text-text-dark-primary">
                {instructor.name}
              </p>
              <p className="text-body-sm text-text-dark-secondary">
                {instructor.role}
                <span className=" hidden sm:inline sm:text-body-sm">
                  {" "}
                  di{""}{" "}
                </span>
                <span className="hidden sm:inline md:text-body-md">
                  {instructor.company}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex w-full gap-2 items-center justify-between md:pt-2 flex-row border-grey-100">
        <Rating value={rating.value} count={rating.count} />
        <span className=" shrink-0 font-heading text-heading-5 md:text-heading-4 text-primary-100 text-text-button-primary">
          {price}
        </span>
      </div>

      {/* Preview Modal - muncul saat hover, cuma di desktop */}
      <div
        className="hidden md:flex absolute inset-0 bg-white rounded-xl shadow-2xl border border-primary-200 p-5
          opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-105
          transition-all duration-200 origin-center z-30 flex-col"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />

        <h3 className="text-body-md font-bold text-text-dark-primary mb-2">
          {title}
        </h3>

        <p className="hidden description-clamp text-body-sm text-text-dark-secondary mb-3">
          {description}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <p className="text-body-sm font-semibold text-text-dark-primary">
              {instructor.name}
            </p>
            <p className="text-body-sm text-text-dark-secondary">
              {instructor.role} di{" "}
              <span className="font-semibold">{instructor.company}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Rating value={rating.value} count={rating.count} />
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-body-md font-bold text-primary-100">
            {price}
          </span>
          <button className="bg-primary-100 hover:bg-primary-600 text-text-light-primary text-body-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}
