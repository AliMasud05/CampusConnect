"use client";

import Image from "next/image";
import React from "react";
import electrical from "@/assets/home/Electrical.png";
import software from "@/assets/home/Software.png";
import { useGetCourseAndUserStatsQuery } from "@/redux/api/statisticsApi";

const AboutMeHome: React.FC = () => {
  const { data } = useGetCourseAndUserStatsQuery({});

  return (
    <section className="container mx-auto bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Bottom Corner Labels for mobile view */}
      <div className="flex md:hidden flex-col gap-8 items-center pt-8">
        {/* Electrical Engineer */}
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold text-text-primary">
            <h3 className="">ELECTRICAL</h3>
            <h3 className="">ENGINEER</h3>
          </div>

          <Image
            src={electrical}
            alt="Haris Kovačević - Electrical Engineer and Software Developer"
            height={64}
            width={64}
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Software Developer */}
        <div className="flex items-center space-x-3 text-2xl font-bold text-text-primary">
          <Image
            src={software}
            alt="Haris Kovačević - Electrical Engineer and Software Developer"
            height={64}
            width={64}
            className="object-cover object-center"
            priority
          />

          <div>
            <h3>SOFTWARE</h3>
            <h3>DEVELOPER</h3>
          </div>
        </div>
      </div>

      <div className="pt-20">
        {/* About me badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
            About me
          </span>
        </div>

        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            I&apos;m Haris Kovačević{" "}
            <span className="relative text-text-secondary inline-block">
              Engineer, Developer, Educator.
              <svg
                className="absolute -bottom-5 left-0 w-full h-6"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8 C20 0, 80 0, 100 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
        </div>

        {/* Description text */}
        <div className="text-center mb-16 space-y-4 mx-auto text-gray-600 text-base sm:text-lg leading-relaxed">
          <p>
            Hello! I&apos;m Haris Kovačević, a Power Electronics Engineer,
            Embedded Software Developer, and passionate educator currently based
            in Germany. I hold a PhD in Electrical Engineering from the Faculty
            of Electrical Engineering and Computer Science, University of
            Maribor.
          </p>
          <p>
            Over the last 8+ years, I&apos;ve worked across Europe on projects
            ranging from motor control systems and solar inverters to automotive
            electronics — designing both hardware and the firmware that powers
            it.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 text-center">
          <div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-secondary mb-2">
              {data?.data?.totalCourses}+
            </div>
            <div className="text-text-primary text-lg font-medium">Courses</div>
          </div>
          <div className="border-l-2 border-r-2 border-black/30">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-secondary mb-2">
              {data?.data?.totalCount}+
            </div>
            <div className="text-text-primary text-lg font-medium">Students</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-secondary mb-2">
              {new Date().getFullYear() - 2017}+
            </div>
            <div className="text-text-primary text-lg font-medium">Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeHome;
