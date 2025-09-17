"use client"

import type React from "react";
import Image from "next/image";
import { HiDownload } from "react-icons/hi";
import profile from "@/assets/about/Profile.png";
import profileBG from "@/assets/about/ProfileBG.png";
import customIcon from "@/assets/about/icons/customIcon.svg";
import softStar from "@/assets/about/icons/SoftStar.svg";
import { useGetRecentResumeQuery } from "@/redux/api/resumeApi";

const AboutMe: React.FC = () => {
  const { data } = useGetRecentResumeQuery({});

  const resumeUrl = data?.data?.url;

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Profile Image with background */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full h-[300px] md:h-[600px]">
              {/* Background Image */}
              <Image
                src={profileBG}
                alt="Background graphic"
                fill
                className="object-contain"
              />

              {/* Foreground Profile Image */}
              <Image
                src={profile}
                alt="Professional headshot"
                fill
                className="object-contain z-10 pt-16"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div className="space-y-4 relative">
              <h2 className="text-2xl sm:text-4xl lg:text-4xl font-bold text-text-primary leading-tight">
                How my{" "}
                <span className="text-text-secondary relative inline-block">
                  Courses
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2"
                    viewBox="0 0 100 8"
                    preserveAspectRatio="none"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 8 C20 0, 80 0, 100 8"
                      stroke="#017F00"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                can help you{" "}
                <Image
                  src={softStar}
                  alt="Soft star icon"
                  height={96}
                  width={96}
                  className="absolute xl:right-20 xl:-top-12 lg:-top-20 lg:right-0 md:right-30 md:-top-10 right-0 -top-18"
                />
              </h2>
            </div>

            {/* Features List */}
            <div className="space-y-8">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <Image
                  src={customIcon}
                  alt="custom icon"
                  className="pt-2"
                  height={20}
                  width={12}
                />
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-xl font-bold text-text-primary">
                    Courses That Teach What Matters
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Project-based courses designed to help you actually apply
                    what you learn — not just memorize.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <Image
                  src={customIcon}
                  alt="custom icon"
                  className="pt-2"
                  height={20}
                  width={12}
                />
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-xl font-bold text-text-primary">
                    Software Development Services
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Digital Control System Design for power converters.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <Image
                  src={customIcon}
                  alt="custom icon"
                  className="pt-2"
                  height={20}
                  width={12}
                />
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-xl font-bold text-text-primary">
                    Downloadable Engineering Resources
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Ready-to-use templates, diagrams, code snippets, and cheat
                    sheets to help you work faster and smarter.
                  </p>
                </div>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="pt-4">
              {resumeUrl ? (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center px-6 py-3 bg-text-secondary hover:bg-primary text-white font-semibold rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <HiDownload className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  Resume will be available soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
