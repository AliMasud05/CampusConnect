"use client";

import React, { useEffect, useState } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import { TCourseReview } from "@/types/review.type";
import TestimonialSkeletonCard from "@/components/skeleton/TestimonialSkeletonCard";

const TestimonialHome: React.FC = () => {
  const {
    data: testimonialData = [],
    isLoading,
    isError,
  } = useGetAllReviewsQuery({});
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const testimonials = testimonialData?.data;

  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 768) setCardsPerPage(1);
      else if (width < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(testimonials?.length / cardsPerPage);

  const currentItems = testimonials?.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
        {Array.from({ length: 6 }).map((_, idx) => (
          <TestimonialSkeletonCard key={idx} />
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
          Failed to load testimonials
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Something went wrong while fetching testimonial data. Please check
          your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
              Testimonials
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            What Students & Clients{" "}
            <span className="relative text-text-secondary inline-block">
              Says
              <svg
                className="absolute -bottom-3 left-0 w-full h-4"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8 C20 0, 80 0, 100 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
            Hear directly from learners and collaborators who&apos;ve experienced my
            teaching, tools, and software firsthand. From students gaining
            confidence in coding to startups scaling with custom software —
            discover how Haris Kovačević is making a difference, one learner at
            a time.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500 ease-in-out animate-fade"
          key={currentPage}
        >
          {currentItems.map((testimonial: TCourseReview) => (
            <TestimonialCard key={testimonial.id} testmonial={testimonial} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-16 pt-10">
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

export default TestimonialHome;
