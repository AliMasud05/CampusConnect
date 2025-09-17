import EnrollNow from "@/components/home/EnrollNow";
import CourseOfferSection from "@/components/serviceDetails/courses/CourseOfferSection";
import NotJustWatch from "@/components/serviceDetails/courses/NotJustWatch";
import WhatYouGetSection from "@/components/serviceDetails/courses/WhatYouGetSection";
import BannerSectionThree from "@/components/shared/BannerSectionThree";
import React from "react";

export default function ServiceDetailsCoursesPage() {
  return (
    <div>
      <BannerSectionThree
        heading="COURSES"
        title="Learn. Build. Apply."
        subtitle="Learn control systems, firmware, and power electronics from someone who builds them daily."
        buttonText="Browse all courses"
        buttonLink="/courses"
        lineBreak={true}
      />

      <NotJustWatch />
      <CourseOfferSection />  
      <WhatYouGetSection />
      <EnrollNow buttonText="Enroll a course today" />
    </div>
  );
}
