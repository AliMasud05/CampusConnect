"use client";

import React from "react";
import ResourceCard from "./ResourceCard";
import { useGetAllResourcesQuery } from "@/redux/api/resourceApi";
import { TResource } from "@/types/resource.type"; // Adjust path if needed
import ResourceSkeletonCard from "../skeleton/ResourceSkeletonCard";

export default function PaidResources() {
  const {
    data: resourceData = [],
    isLoading,
    isError,
  } = useGetAllResourcesQuery({});
  console.log(resourceData, "resourceData from query");
  const resources: TResource[] =
    resourceData?.data?.filter(
      (resource: TResource) => resource.status === "PAID"
    ) || [];

  return (
    <div className="container mx-auto pt-20 flex flex-col gap-10">
      <h1 className="text-3xl md:text-4xl font-medium text-text-primary text-center">Paid Resources</h1>

      {isLoading ? (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ResourceSkeletonCard key={idx} />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 font-medium py-10">
          Failed to load paid resources. Please try again later.
        </div>
      ) : resources.length === 0 ? (
        <p className="text-center text-gray-600 py-10">
          No paid resources available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {resources.map((resource: TResource) => (
            <ResourceCard key={resource.id} {...resource} />
          ))}
        </div>
      )}
    </div>
  );
}
