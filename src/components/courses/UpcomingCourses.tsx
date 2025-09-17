"use client";

import React, { useState } from "react";
import CourseCard from "@/components/courses/CourseCard";
import CourseSkeletonCard from "@/components/skeleton/CourseSkeletonCard";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { TCourse } from "@/types/course.type";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const UpcomingCourses = () => {
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery({});

  const upcomingCourses =
    courses?.data?.filter((course: TCourse) => course.status === "UPCOMING") ||
    [];

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = upcomingCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(upcomingCourses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 96, behavior: "smooth" });
      });
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <CourseSkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center text-center py-20 px-4">
        <svg
          className="w-12 h-12 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12A9 9 0 103 12a9 9 0 0018 0z"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to load courses
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Something went wrong while fetching course data. Please check your
          connection and try again.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {currentCourses.map((course: TCourse) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      {/* Pagination Controls */}
      {
        <div className="flex justify-center items-center space-x-2 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer bg-primary h-12 w-12 rounded-full text-white px-4 py-3 border text-sm font-medium hover:bg-primary/80 disabled:opacity-50"
          >
            <FaArrowLeft />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`cursor-pointer h-12 w-12 rounded-full border text-xl font-medium ${
                currentPage === index + 1
                  ? "bg-text-secondary text-white border-text-secondary"
                  : "text-text-primary bg-secondary"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer bg-primary h-12 w-12 rounded-full text-white px-4 py-3 border text-sm font-medium hover:bg-primary/80 disabled:opacity-50"
          >
            <FaArrowRight />
          </button>
        </div>
      }
    </>
  );
};

export default UpcomingCourses;
