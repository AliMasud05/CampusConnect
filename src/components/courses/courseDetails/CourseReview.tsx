"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { HiMiniStar } from "react-icons/hi2";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TReview } from "@/types/course.type";

const CourseReview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const params = useParams();
  const { data, isLoading } = useGetCourseByIdQuery(params.id as string);
  const testimonialsData = data?.data?.reviews || [];

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      let newCardsPerPage = 3;
      if (width < 768) newCardsPerPage = 1;
      else if (width < 1024) newCardsPerPage = 2;

      setCardsPerPage(newCardsPerPage);

      // Clamp current page
      setCurrentPage((prev) => {
        const newTotalPages = Math.ceil(testimonialsData.length / newCardsPerPage);
        return prev >= newTotalPages ? Math.max(newTotalPages - 1, 0) : prev;
      });
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, [testimonialsData.length]);

  const totalPages = Math.ceil(testimonialsData.length / cardsPerPage);

  const currentItems = testimonialsData.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  if (testimonialsData.length === 0)
    return;

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="flex items-center justify-center gap-5 text-3xl  lg:text-4xl text-gray-900 leading-tight mb-6">
            <HiMiniStar className="text-yellow-500" />
            {Math.round(data?.data?.averageRating)}/5 course rating
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500 ease-in-out animate-fade"
          key={currentPage}
        >
          {currentItems.map((testimonial: TReview) => (
            <TestimonialCard
              key={testimonial.id}
              testmonial={testimonial}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-7 pt-10">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-full border border-black disabled:opacity-30"
          >
            <MdOutlineArrowBackIosNew />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="cursor-pointer flex items-center justify-center h-9 w-9 rounded-full border border-black disabled:opacity-30"
          >
            <MdOutlineArrowForwardIos />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseReview;
