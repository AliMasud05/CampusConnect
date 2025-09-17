import ContactSection from "@/components/contact/ContactSection";
import BannerSectionTwo from "@/components/shared/BannerSectionTwo";
import React from "react";

export default function ContactPage() {
  return (
    <div>
      <BannerSectionTwo
        title="Let’s Connect — "
        titleBelow="I’d Love to Hear From You"
        subtitle="Whether you have a question about a course, want to collaborate on a project, or just want to say hi — my inbox is always open."
      />

      <ContactSection />
    </div>
  );
}
