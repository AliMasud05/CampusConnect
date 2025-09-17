"use client";

import React from "react";
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useGetResourceByIdQuery } from "@/redux/api/resourceApi";
import { CourseDetailsSkeleton } from "@/components/skeleton/CourseDetailsSkeleton";

const ResourceDetailsSection: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading, isError } = useGetResourceByIdQuery(id as string);
  const resource = data?.data;

  const handleBuyNow = () => {
    router.push(`/resources/${id}/payment`);
  };

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || !resource) {
    return (
      <div className="text-center text-red-500 py-10">
        Failed to load resource. Please try again later.
      </div>
    );
  }

  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Resource Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
                {resource.title}
              </h1>
            </div>

            <div>
              <p className="text-gray-600 text-xl font-normal sm:text-lg leading-relaxed">
                {resource.topic}
              </p>
            </div>

            <div className="flex gap-3">
              <span
                className="inline-flex items-center pr-6 py-3 
              border-r-1 border-black text-xl font-normal text-gray-800"
              >
                One-time purchase
              </span>

              <span className="inline-flex items-center pr-6 py-3 border-r-1 border-black text-xl font-normal text-gray-800">
                File Size {resource?.fileSize}
              </span>

              <span className="inline-flex items-center px-3 py-4 text-xl font-normal text-gray-800">
                Format .{resource.type}
              </span>
            </div>

            <div className="flex items-center space-x-3 md:space-x-24">
              <div className="flex items-center">
                <span className="text-3xl md:text-5xl font-medium text-text-primary">
                  €{resource.price}
                </span>
              </div>

              <button
                onClick={handleBuyNow}
                className="cursor-pointer inline-flex items-center
                 bg-text-secondary hover:bg-primary text-white text-lg font-normal py-3 px-6 md:px-12 
                 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <FaShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </button>
            </div>
          </div>

          {/* Right side - Resource Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={resource.thumbnail}
                alt={resource.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceDetailsSection;
