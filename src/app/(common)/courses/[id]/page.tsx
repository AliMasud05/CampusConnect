"use client"
import CourseDetails from '@/components/courses/courseDetails/courseDetails'
import BannerSectionTwo from '@/components/shared/BannerSectionTwo'

export default function Page() {
  return (
    <div>
      <BannerSectionTwo title="Course Details" subtitle="" />
      <CourseDetails />
    </div>
  );
}
