import React from "react";

const WhatYouLearnSkeleton = () => {
  const skeletonItems = new Array(4).fill(null);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {skeletonItems.map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 animate-pulse"
        >
          <div className="flex items-center space-x-4 justify-center">
            <div className="w-4 h-6 flex flex-col items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-0.5 h-4 bg-gray-300"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatYouLearnSkeleton;
