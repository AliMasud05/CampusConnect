"use client"

import React from "react";
import Image from "next/image";
import softStar from "@/assets/about/icons/SoftStar.svg";
import { useGetCourseAndUserStatsQuery } from "@/redux/api/statisticsApi";

const roles = ["ELECTRICAL ENGINEER", "SOFTWARE DEVELOPER", "MENTOR"];

const AboutSection: React.FC = () => {
  const { data } = useGetCourseAndUserStatsQuery({});

  return (
    <section className="container mx-auto bg-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="">
        {/* About me badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
            About me
          </span>
        </div>

        <div className="absolute top-[15%] md:top-[20%] xl:right-[33%] lg:right-[17%] md:right-[5%] right-1">
          <Image src={softStar} alt="Soft star icon" height={150} width={150} />
        </div>

        {/* Main heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-text-primary leading-tight">
            Building Systems. Solving Problems.{" "}
            <span className="relative text-text-secondary inline-block">
              Empowering
              <svg
                className="absolute -bottom-4 left-0 w-full h-5"
                viewBox="0 0 200 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 2 100 2 198 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Learners.
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
            <div className="text-text-primary text-lg font-medium">
              Students
            </div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-secondary mb-2">
              {new Date().getFullYear() - 2017}+
            </div>
            <div className="text-text-primary text-lg font-medium">
              Experience
            </div>
          </div>
        </div>
      </div>

      {/* Marquee section */}
      <div className="w-96 md:w-[720px] lg:w-[1000px] xl:w-full mx-auto bg-primary py-4 overflow-hidden">
        <div className="animate-marquee flex items-center space-x-8 text-white font-bold text-lg sm:text-xl min-w-max px-4">
          {Array(4)
            .fill(roles)
            .flat()
            .map((role, idx) => (
              <React.Fragment key={idx}>
                <span>{role}</span>
                <div className="">
                  <Image
                    src={softStar}
                    alt="soft star logo"
                    height={52}
                    width={52}
                    className="object-cover"
                  />
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
