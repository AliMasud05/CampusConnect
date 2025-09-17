import React from "react";

const SkeletonBox = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

const CourseBillingDetailsSkeleton: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 animate-pulse">
      <SkeletonBox className="h-6 w-48 mb-6" />

      <div className="flex flex-col md:flex-row mb-6 gap-6">
        <SkeletonBox className="w-[150px] h-[100px] rounded-lg" />
        <div className="flex-1 space-y-2">
          <SkeletonBox className="h-5 w-3/4" />
          <SkeletonBox className="h-4 w-1/2" />
        </div>
      </div>

      <SkeletonBox className="h-px w-full bg-gray-300 mb-4" />
      <SkeletonBox className="h-5 w-40 mb-4" />

      <div className="space-y-3">
        <div className="flex justify-between">
          <SkeletonBox className="h-4 w-32" />
          <SkeletonBox className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <SkeletonBox className="h-4 w-40" />
          <SkeletonBox className="h-4 w-20" />
        </div>
        <SkeletonBox className="h-px w-full bg-gray-300 mt-4" />
        <div className="flex justify-between mt-2">
          <SkeletonBox className="h-5 w-32" />
          <SkeletonBox className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
};

export default CourseBillingDetailsSkeleton;
