import FreeResources from "@/components/resources/FreeResources";
import PaidResources from "@/components/resources/PaidResources";
import ResourcesSection from "@/components/resources/ResourcesSection";
import BannerSectionTwo from "@/components/shared/BannerSectionTwo";
import React from "react";

export default function ResourcesPage() {
  return (
    <div>
      <BannerSectionTwo
        title="Build Faster with"
        titleBelow="Proven Engineering Tools"
        subtitle="From control algorithms to wiring diagrams — skip the blank page and get working with plug-and-play files."
      />

      <ResourcesSection />
      <FreeResources />
      <PaidResources />
    </div>
  );
}
