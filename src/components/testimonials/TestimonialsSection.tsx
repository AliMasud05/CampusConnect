"use client";

import React, { useState } from "react";
import TestimonialCard from "./TestimonialCard";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { TCourseReview } from "@/types/review.type";
import TestimonialSkeletonCard from "../skeleton/TestimonialSkeletonCard";
import softStar from "@/assets/about/icons/SoftStar.svg";
import Image from "next/image";

const TestimonialsSection: React.FC = () => {
  const {
    data: reviewsData = [],
    isLoading,
    isError,
  } = useGetAllReviewsQuery({});
  const [currentPage, setCurrentPage] = useState(1);
  const reviews = reviewsData?.data || [];

  const cardsPerPage = 9;
  const totalPages = Math.ceil(reviews.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentItems = reviews.slice(indexOfFirstCard, indexOfLastCard);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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

          <div className="absolute top-[15%] md:top-[20%] xl:top-[15%] xl:right-[33%] lg:right-[24%] md:right-[15%] right-1">
            <Image
              src={softStar}
              alt="Soft star icon"
              height={150}
              width={150}
            />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight mb-6">
            What Students & Clients{" "}
            <span className="relative text-text-secondary">
              Says
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C25 2 50 2 98 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
            Hear directly from learners and collaborators who&apos;ve experienced my
            teaching, tools, and software firsthand. From students gaining
            confidence in coding to startups scaling with custom software —
            discover how Haris Kovačević is making a difference, one learner at
            a time.
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {Array.from({ length: 6 }).map((_, idx) => (
              <TestimonialSkeletonCard key={idx} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 font-medium">
            Failed to load testimonials. Please try again later.
          </div>
        ) : (
          <>
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-10">
              {currentItems.map((testimonial: TCourseReview) => (
                <TestimonialCard
                  key={testimonial.id}
                  testmonial={testimonial}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="cursor-pointer h-12 w-12 bg-text-secondary text-white px-4 py-2 border rounded-full text-sm font-medium disabled:bg-text-secondary/50"
              >
                <MdOutlineArrowBackIosNew />
              </button>
              <span className="text-xl text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="cursor-pointer h-12 w-12 bg-text-secondary text-white px-4 py-2 border rounded-full text-sm font-medium disabled:bg-text-secondary/50"
              >
                <MdOutlineArrowForwardIos />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
