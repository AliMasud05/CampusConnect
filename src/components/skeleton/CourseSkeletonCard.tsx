"use client";

import React from "react";

const CourseSkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 sm:h-52 bg-gray-200 w-full" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-2/3" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-8 bg-gray-200 rounded" />
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
          <div className="h-6 w-12 bg-gray-200 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col-reverse md:flex-row gap-3 pt-4">
          <div className="h-10 w-full bg-gray-200 rounded-full" />
          <div className="h-10 w-full bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CourseSkeletonCard;
