"use client";

import CourseCard from "@/components/courses/CourseCard";
import CourseSkeletonCard from "@/components/skeleton/CourseSkeletonCard";
import { useGetCoursesQuery } from "@/redux/api/courseApi";
import { TCourse } from "@/types/course.type";
import React from "react";

const UpcomingCoursesHome = () => {
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery({});

  const upcomingCourses = courses?.data?.filter(
    (course: TCourse) => course.status === "UPCOMING"
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {Array.from({ length: 3 }).map((_, idx) => (
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
        {upcomingCourses?.slice(0, 3).map((course: TCourse) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </>
  );
};

export default UpcomingCoursesHome;
