"use client";

import React from "react";
import ResourceCard from "./ResourceCard";
import { useGetAllResourcesQuery } from "@/redux/api/resourceApi";
import { TResource } from "@/types/resource.type";
import ResourceSkeletonCard from "../skeleton/ResourceSkeletonCard";

export default function FreeResources() {
  console.log("FreeResources");
  const {
    data: resourcesData = [],
    isLoading,
    isError,
  } = useGetAllResourcesQuery({});
  console.log(resourcesData, "resourcesData");
  const resources: TResource[] =
    resourcesData?.data?.filter((item: TResource) => item.status === "FREE") ||
    [];
    console.log(resources, "resources");

  if (isLoading) {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {Array.from({ length: 6 }).map((_, idx) => (
          <ResourceSkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 font-medium">
        Failed to load resources. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-20 flex flex-col gap-10">
      <h1 className="text-3xl md:text-4xl font-medium text-text-primary text-center">Free Resources</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} {...resource} />
        ))}
      </div>
    </div>
  );
}
