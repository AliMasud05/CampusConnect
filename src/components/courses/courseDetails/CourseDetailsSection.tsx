"use client";

import { useState } from "react";
import Image from "next/image";
import { FaStar, FaPlay } from "react-icons/fa";
import VideoModal from "./VideoModal";
import { useParams, useRouter } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { CourseDetailsSkeleton } from "@/components/skeleton/CourseDetailsSkeleton";

const CourseDetailsSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const params = useParams();

  const { data: courses, isLoading } = useGetCourseByIdQuery(params.id);

  const instructor = "Haris Kovačević";

  const router = useRouter();

  const handleEnroll = () => {
    router.push(`/courses/${params.id}/payment`);
  };

  const handlePlayVideo = () => {
    setIsVideoModalOpen(true);
  };

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

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  return (
    <>
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side - Course Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
                  {courses?.data?.title}
                </h1>

                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {renderStars(courses?.data?.averageRating)}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  {courses?.data?.description}
                </p>
              </div>

              <div className="flex items-center space-x-12">
                <div className="flex items-center">
                  <span className="text-4xl sm:text-5xl font-bold text-text-primary">
                    €{courses?.data?.price.toFixed(2)}
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
                  src={courses?.data?.thumnail}
                  alt={`${courses?.data?.title} course preview`}
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute top-6 left-6 right-6">
                    <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow-lg">
                      {courses?.data?.title}
                      <span className="block text-base sm:text-lg font-normal opacity-90">
                        with {instructor}
                      </span>
                    </h2>
                  </div>

                  <button
                    onClick={handlePlayVideo}
                    className="cursor-pointer bg-white/50 backdrop-blur-md group relative w-20 h-20 sm:w-24 sm:h-24 bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
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

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={courses?.data?.demoVideo}
        title={`${courses?.data?.title} - Course Preview`}
      />
    </>
  );
};

export default CourseDetailsSection;
