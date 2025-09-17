/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  FaStar,
  FaPlay,
  FaChevronUp,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import { HiMiniStar } from "react-icons/hi2";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import classes from "@/assets/courseDetails/Classes.png";
import duration from "@/assets/courseDetails/Duration.png";
import language from "@/assets/courseDetails/Language.png";
import skill from "@/assets/courseDetails/Skill.png";
import { CourseDetailsSkeleton } from "@/components/skeleton/CourseDetailsSkeleton";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import type { TModule, TReview } from "@/types/course.type";
import WhatYouLearnSkeleton from "@/components/skeleton/WhatYouLearnSkeleton";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";

const CourseDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  console.log(params, "params from courseDetails");
  const { data: course, isLoading } = useGetCourseByIdQuery(params.id);

  console.log(course, "course from courseDetails");

  // Video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Module accordion state
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  // Testimonial carousel state
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  // Handle module accordion toggle
  const toggleModule = (moduleId: string) => {
    const newExpandedModules = new Set(expandedModules);
    if (newExpandedModules.has(moduleId)) {
      newExpandedModules.delete(moduleId);
    } else {
      newExpandedModules.add(moduleId);
    }
    setExpandedModules(newExpandedModules);
  };

  const isExpanded = (moduleId: string) => expandedModules.has(moduleId);

  const formatReviewCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toString();
  };

  // Total review count
  const totalReviewCount = course?.data?.reviews?.length || 0;
  const formattedReviewCount = formatReviewCount(totalReviewCount);

  // Handle testimonial carousel responsiveness
  useEffect(() => {
    const updateCardsPerPage = () => {
      const width = window.innerWidth;
      let newCardsPerPage = 3;
      if (width < 768) newCardsPerPage = 1;
      else if (width < 1024) newCardsPerPage = 2;

      setCardsPerPage(newCardsPerPage);
      setCurrentPage((prev) => {
        const newTotalPages = Math.ceil(
          (course?.data?.reviews?.length || 0) / newCardsPerPage
        );
        return prev >= newTotalPages ? Math.max(newTotalPages - 1, 0) : prev;
      });
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, [course?.data?.reviews?.length]);

  // Course enrollment handler
  const handleEnroll = () => {
    router.push(`/courses/${params.id}/payment`);
  };

  // Video modal handlers
  const handlePlayVideo = () => setIsVideoModalOpen(true);
  const handleCloseVideo = () => setIsVideoModalOpen(false);

  // Testimonial carousel navigation
  const totalPages = Math.ceil(
    (course?.data?.reviews?.length || 0) / cardsPerPage
  );
  const currentItems =
    course?.data?.reviews?.slice(
      currentPage * cardsPerPage,
      currentPage * cardsPerPage + cardsPerPage
    ) || [];

  const handlePrev = () =>
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () =>
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  // Utility functions
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatSkillLevel = (skillLevel: string): string => {
    switch (skillLevel?.toUpperCase()) {
      case "BEGINNER":
        return "Beginner";
      case "INTERMEDIATE":
        return "Intermediate";
      case "ADVANCED":
        return "Advanced";
      default:
        return "N/A";
    }
  };

  // Course info items for SkillLevelSection
  const infoItems = [
    {
      label: "Skill Level",
      value: course?.data?.level ? formatSkillLevel(course.data.level) : "N/A",
      logo: skill,
    },
    {
      label: "Duration",
      value: course?.data?.duration
        ? formatDuration(Number(course.data.duration))
        : "N/A",
      logo: duration,
    },
    {
      label: "Language",
      value: course?.data?.language || "N/A",
      logo: language,
    },
    {
      label: "Classes",
      value: course?.data?.classes || "N/A",
      logo: classes,
    },
  ];

  // Sort learningData by order
  const sortedLearningData = course?.data?.learningData
    ? [...course.data.learningData].sort((a, b) => a.order - b.order)
    : [];

  // Sort modules by order
  const sortedModules = course?.data?.modules
    ? [...course.data.modules].sort((a, b) => a.order - b.order)
    : [];

  if (isLoading) {
    return (
      <div>
        <CourseDetailsSkeleton />
        <WhatYouLearnSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Course Details Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Course Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
                  {course?.data?.title}
                </h1>

                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(course?.data?.averageRating || 0)}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {course?.data?.description}
                </p>
              </div>

              <div className="flex items-center space-x-12">
                <div className="flex items-center">
                  <span className="text-4xl sm:text-5xl font-bold text-text-primary">
                    €{course?.data?.discountedPrice?.toFixed(2) || "0.00"}
                  </span>
                </div>

                <div className="w-px h-12 bg-gray-300"></div>

                <button
                  onClick={handleEnroll}
                  className="cursor-pointer bg-text-secondary hover:bg-primary text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Right side - Video Thumbnail */}
            <div className="relative">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={course?.data?.thumnail || ""}
                  alt={`${course?.data?.title} course preview`}
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute top-6 left-6 right-6">
                    <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow-lg">
                      {course?.data?.title}
                      <span className="block text-base sm:text-lg font-normal opacity-90">
                        with {course?.data?.instructor || "Instructor"}
                      </span>
                    </h2>
                  </div>

                  <button
                    onClick={handlePlayVideo}
                    className="cursor-pointer bg-white/50 backdrop-blur-md group 
                    relative w-20 h-20 sm:w-24 sm:h-24 bg-opacity-90 hover:bg-opacity-100 
                    rounded-full flex items-center justify-center transition-all duration-300
                     hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                    aria-label="Play course preview video"
                  >
                    <FaPlay className="w-8 h-8 sm:w-10 sm:h-10 text-gray-800 ml-1 group-hover:text-primary transition-colors duration-200" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Level Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container md:max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {infoItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 px-10 py-5 rounded-2xl flex flex-col items-center shadow-2xl"
              >
                <Image
                  src={item.logo}
                  alt={item.label}
                  width={40}
                  height={40}
                  className="mb-4"
                />

                <h3 className="text-center text-lg font-semibold text-text-primary">
                  {item.label}:
                </h3>
                <p className="text-center font-medium text-text-primary mb-2">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      {sortedLearningData.length > 0 && (
        <section className="container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-gray-900 leading-tight">
                What You&apos;ll{" "}
                <span className="relative text-text-secondary">
                  Learn
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {sortedLearningData.map((outcome: any) => (
                <div
                  key={outcome.id}
                  className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-sm transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4 justify-center">
                    <div className="pt-2">
                      <div className="w-4 h-6 flex flex-col items-center">
                        <div className="w-2 h-2 bg-text-primary rounded-full"></div>
                        <div className="w-0.5 h-4 bg-gray-400"></div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-800 text-xl md:text-2xl font-medium leading-relaxed">
                        {outcome.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Class Modules Section */}
      {sortedModules.length > 0 && (
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary">
                Class Modules
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {sortedModules.map((module: TModule) => (
                <div
                  key={module.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-sm"
                >
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="cursor-pointer w-full p-6 sm:p-8 text-left"
                    aria-expanded={isExpanded(module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                          <span className="font-bold">{module.title}</span>
                        </h3>
                      </div>
                      <div className="flex-shrink-0">
                        {isExpanded(module.id) ? (
                          <div className="rounded-full bg-[#E6E6E6] p-3">
                            <FaChevronUp className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="rounded-full bg-[#E6E6E6] p-3">
                            <FaChevronDown className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>

                  {isExpanded(module.id) && (
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <div className="border-t border-gray-100 pt-6">
                        <ul className="space-y-3">
                          {[...(module.videos || [])]
                            .sort((a, b) => a.order - b.order)
                            .map((video, i) => (
                              <li key={i} className="flex items-start">
                                <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mt-3 mr-3"></span>
                                <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                  {video.title}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Course Review Section */}
      {course?.data?.reviews?.length > 0 && (
        <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-16 flex items-center justify-center gap-6">
              <h2 className="flex items-center gap-3 text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary">
                <HiMiniStar className="text-yellow-500" />
                {Math.round(course?.data?.averageRating || 0)}/5 course rating
              </h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="17"
                viewBox="0 0 15 18"
                fill="none"
              >
                <circle cx="9" cy="8.5" r="8.5" fill="#363636" />
              </svg>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary">
                {formattedReviewCount} ratings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-500 ease-in-out animate-fade">
              {currentItems.map((testimonial: TReview) => (
                <TestimonialCard
                  key={testimonial.id}
                  testmonial={testimonial}
                />
              ))}
            </div>

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
      )}

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 bg-opacity-75"
            onClick={handleCloseVideo}
          />

          <div className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden">
            <button
              onClick={handleCloseVideo}
              className="cursor-pointer absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors duration-200"
              aria-label="Close video"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            <div className="relative aspect-video">
              <video
                src={course?.data?.demoVideo}
                controls
                controlsList="nodownload"
                autoPlay
                className="w-full h-full"
                title={`${course?.data?.title} - Course Preview`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;
