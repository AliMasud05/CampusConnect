import React from "react";

const TestimonialSkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse space-y-4">
      {/* Quote Icon Placeholder */}
      <div className="h-14 w-14 rounded-full bg-gray-200" />

      {/* Quote Text Placeholder */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-11/12" />
        <div className="h-4 bg-gray-200 rounded w-10/12" />
        <div className="h-4 bg-gray-200 rounded w-9/12" />
      </div>

      {/* Profile Section Placeholder */}
      <div className="flex items-center space-x-3 pt-4">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-2/3" />
          <div className="h-3 bg-gray-100 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSkeletonCard;
