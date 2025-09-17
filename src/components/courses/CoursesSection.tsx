"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveTab } from "@/redux/features/coursesTabSlice";
import AllCourses from "./AllCourses";
import UpcomingCourses from "./UpcomingCourses";

const CoursesSection = () => {
  const dispatch = useDispatch();
  const activeTab = 
  useSelector((state: RootState) => state.coursesTab.activeTab);

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => dispatch(setActiveTab("all"))}
              className={`cursor-pointer pb-4 px-2 text-sm sm:text-base font-semibold ${
                activeTab === "all"
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              ALL COURSES
            </button>
            <button
              onClick={() => dispatch(setActiveTab("upcoming"))}
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
        {activeTab === "all" ? <AllCourses /> : <UpcomingCourses />}
      </div>
    </section>
  );
};

export default CoursesSection;
