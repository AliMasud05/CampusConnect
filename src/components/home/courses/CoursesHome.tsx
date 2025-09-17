"use client";

import { useState } from "react";
import AllCoursesHome from "./AllCoursesHome";
import UpcomingCoursesHome from "./UpcomingCoursesHome";
import { useRouter } from "next/navigation";

const CoursesHome = () => {
  const [activeTab, setActiveTab] = useState<"all" | "upcoming">("all");

  const router = useRouter();

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
              Courses
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            Featured{" "}
            <span className="relative text-text-secondary inline-block">
              Courses
              <svg
                className="absolute -bottom-3 left-0 w-full h-4"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8 C20 0, 80 0, 100 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            by Haris Kovačević
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("all")}
              className={`cursor-pointer pb-4 px-2 text-sm sm:text-base font-semibold ${
                activeTab === "all"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ALL COURSES
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`cursor-pointer pb-4 px-2 text-sm sm:text-base font-semibold ${
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
        {activeTab === "all" ? <AllCoursesHome /> : <UpcomingCoursesHome />}

        <div className="flex justify-center">
          <button
            onClick={() => router.push("/courses")}
            className="cursor-pointer bg-white hover:bg-text-secondary hover:text-white text-text-secondary font-semibold py-3 px-4 rounded-full border border-text-secondary transition-colors duration-200"
          >
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesHome;
