"use client"

import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import { useParams } from "next/navigation";
import React from "react";

const HowToUse: React.FC = () => {
  const { id } = useParams();

  const { data } = useGetResourceByIdQuery(id as string);

  if(data?.data?.uses === null) {
    return
  }

  return (
    <section className="container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="">
        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
            How to use this{" "}
            <span className="relative text-text-secondary inline-block">
              Resource
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
          </h1>
        </div>

        {/* Description text */}
        <div className="md:max-w-4xl text-center mb-16 space-y-4 mx-auto text-gray-600 text-base sm:text-lg leading-relaxed">
          <p className="text-center">
            {data?.data?.uses}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
