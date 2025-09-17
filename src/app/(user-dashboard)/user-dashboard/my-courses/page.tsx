/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import UserAllCourses from "@/components/userDashboard/userAllCourses/UserAllCourses";
import UserUpcomingCourses from "@/components/userDashboard/userUpcomingCourse/UserUpcomingCourses";
import { useGetMeQuery } from "@/redux/api/authApi";

export default function MyCoursesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming">("all");

  const { data: userData } = useGetMeQuery({});
  const user = userData?.data;

  // Filter ongoing courses (status === "ONGOING")
  const ongoingCourses =
    user?.enrollments?.filter(
      (enrollment:any) => enrollment.course.status === "ONGOING"
    ) || [];

  // Filter upcoming courses (status === "UPCOMING")
  const upcomingCourses =
    user?.enrollments?.filter(
      (enrollment:any) => enrollment.course.status === "UPCOMING"
    ) || [];

  return (
    <section className="w-full md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className=" my-20 ">
        {/* Tabs */}
        <div className=" mb-12  max-w-5xl mx-auto">
          <div className="flex space-x-8 ">
            <button
              onClick={() => setActiveTab("all")}
              className={`cursor-pointer pb-4 px-2 md:text-2xl text-base font-semibold ${
                activeTab === "all"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ALL COURSES
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`cursor-pointer pb-4 px-2 md:text-2xl text-base font-semibold ${
                activeTab === "upcoming"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              UPCOMING COURSES
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "all" ? (
          <UserAllCourses
            enrollments={[...ongoingCourses, ...upcomingCourses]}
          />
        ) : (
          <UserUpcomingCourses enrollments={upcomingCourses} />
        )}
      </div>
    </section>
  );
}
