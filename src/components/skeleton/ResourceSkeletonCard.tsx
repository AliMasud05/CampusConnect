import React from "react";

const ResourceSkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-48 sm:h-52 bg-gray-200 w-full" />

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        {/* Meta info */}
        <div className="flex gap-3 pt-4">
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>

        {/* Price or CTA */}
        <div className="h-4 bg-gray-200 rounded w-1/4" />

        {/* Button */}
        <div className="mt-6 h-10 bg-gray-300 rounded-full w-full" />
      </div>
    </div>
  );
};

export default ResourceSkeletonCard;
