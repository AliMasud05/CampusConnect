"use client";

import WhatYouLearnSkeleton from "@/components/skeleton/WhatYouLearnSkeleton";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import { useParams } from "next/navigation";
import type React from "react";

type TCourseReviewNote = {
  id: string;
  comment: string;
  order: number;
  courseId: string;
  createdAt: string;
};

const WhatYouLearnSection: React.FC = () => {
  const params = useParams();

  const { data: courses, isLoading } = useGetCourseByIdQuery(params.id);

  const learningOutcomes = courses?.data?.learningData || [];

  if (isLoading) {
    return <WhatYouLearnSkeleton />;
  }

  if (learningOutcomes.length === 0) {
    return
  }

  return (
    <section className="container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
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

        {/* Learning Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {learningOutcomes.map((outcome: TCourseReviewNote) => (
            <div
              key={outcome.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4 justify-center">
                {/* Green Bullet Point */}
                <div className="pt-2">
                  <div className="w-4 h-6 flex flex-col items-center">
                    <div className="w-2 h-2 bg-text-primary rounded-full"></div>
                    <div className="w-0.5 h-4 bg-gray-400"></div>
                  </div>
                </div>

                {/* Learning Outcome Text */}
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
  );
};

export default WhatYouLearnSection;
