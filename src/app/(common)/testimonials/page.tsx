import BannerSectionTwo from "@/components/shared/BannerSectionTwo";
import TestimonialsSection from "@/components/testimonials/TestimonialsSection";
import React from "react";

export default function TestimonialPage() {
  return (
    <div>
      <BannerSectionTwo
        title="What Learners"
        titleBelow="Are Saying"
        subtitle="Trusted by engineers, developers, and students around the world — these stories reflect the impact of practical, project-based learning."
      />

      <TestimonialsSection />
    </div>
  );
}
