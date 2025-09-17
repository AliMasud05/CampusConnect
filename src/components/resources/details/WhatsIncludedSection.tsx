"use client";

import WhatYouLearnSkeleton from "@/components/skeleton/WhatYouLearnSkeleton";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import { useParams } from "next/navigation";
import type React from "react";

type TResourceComment = {
  id: string;
  comment: string;
  resourceId: string;
  createdAt: string; // ISO date string
};


const WhatsIncludedSection: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetResourceByIdQuery(id as string);
  const resource = data?.data;
  console.log(resource,"resource")

  if(isLoading) {
    return <WhatYouLearnSkeleton />
  }

  if(resource?.included.length === 0) {
    return
  }

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary">
            What&apos;s{" "}
            <span className="relative text-text-secondary inline-block">
              Included
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 2 100 2 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
          </h2>
        </div>

        {/* Included Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {resource?.included.map((item: TResourceComment) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                {/* Green Bullet Point */}
                <div className="pt-2">
                  <div className="w-4 h-6 flex flex-col items-center">
                    <div className="w-2 h-2 bg-text-primary rounded-full"></div>
                    <div className="w-0.5 h-4 bg-gray-400"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="">
                    <span className="text-gray-800 text-xl 
                    md:text-2xl font-medium leading-relaxed">
                      {item.comment}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncludedSection;
