import AboutMeHome from "@/components/home/AboutMeHome";
import BannerHomeSection from "@/components/home/BannerHomeSection";
import CoursesHome from "@/components/home/courses/CoursesHome";
import EnrollNow from "@/components/home/EnrollNow";
import Knowledge from "@/components/home/knowledgeAndTools/Knowledge";
import FloatingGallerySection from "@/components/home/testimonial/FloatingGallerySection";
import TestimonialHome from "@/components/home/testimonial/TestimonialHome";

export default function CommonLayoutHomePage() {
  return (
    <div>
      <BannerHomeSection />
      <AboutMeHome />
      <Knowledge />
      <CoursesHome />
      <FloatingGallerySection />
      <TestimonialHome />
      <EnrollNow buttonText="Enroll Now" />
    </div>
  );
}
