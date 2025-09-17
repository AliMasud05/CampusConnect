"use client";
import type React from "react";

import middleImage from "@/assets/home/image.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuArrowUpRight } from "react-icons/lu";
import electrical from "@/assets/home/Electrical.png";
import software from "@/assets/home/Software.png";

import elctrical from "@/assets/home/icons/elctrical.svg";
import hands from "@/assets/home/icons/hands.svg";
import phd from "@/assets/home/icons/phd.svg";
import problem from "@/assets/home/icons/problem.svg";

import profile from "@/assets/home/profile.png";

const BannerHomeSection: React.FC = () => {
  const router = useRouter();

  const handleEnrollNow = () => {
    router.push("/courses");
  };

  return (
    <section className="relative home-banner lg:-mt-[90px] w-full h-[1000px] md:h-[800px] overflow-hidden">
      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Side - Main Heading */}
          <div className=" space-y-6 lg:pb-52 pt-12 xl:pl-24">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                LEARN.
                <br />
                BUILD.
                <br />
                SUCCEED
              </h1>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl text-text-primary">
                  — With
                </span>
                <span className="text-xl sm:text-2xl font-bold text-text-secondary relative inline-block">
                  Haris Kovačević
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
                </span>
              </div>
            </div>
          </div>

          {/* Center - Hero Image with Floating Elements */}
          <div>
            <div className="lg:flex justify-center">
              <div className="hidden lg:block">
                <Image
                  src={middleImage}
                  className="lg:!max-w-none w-auto lg:h-[900px] lg:pt-28"
                  alt=""
                />
              </div>
              <div className="block md:hidden">
                <Image
                  src={profile}
                  className="lg:!max-w-none w-auto lg:pt-28"
                  alt=""
                />
              </div>
              <div className="hidden md:block lg:hidden">
                <Image
                  src={profile}
                  className="lg:!max-w-none w-auto md:pt-20"
                  alt=""
                />
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute md:top-[43%] top-[60%] right-3 lg:top-[40%] lg:right-[320px] xl:top-[40%] xl:right-[480px] rounded-lg px-3 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={elctrical}
                      alt="Electrical icon"
                      className="w-6 h-6 text-text-primary"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      Problem Solving & Innovation
                    </span>
                  </div>
                </div>

                <div className="absolute md:left-[45%] top-[50%] left-[40%] lg:top-[46%] lg:left-[340px] xl:top-[47%] xl:left-[500px] rounded-lg px-3 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={phd}
                      alt="Electrical icon"
                      className="w-6 h-6 text-text-primary"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      Electrical Systems Design
                    </span>
                  </div>
                </div>

                <div className="absolute md:top-[59%] md:left-[72%] top-[55%] left-1 lg:top-[600px] lg:left-80 xl:left-[570px] xl:top-[640px] rounded-lg px-3 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={problem}
                      alt="Electrical icon"
                      className="w-6 h-6 text-text-primary"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      Hands-On Online Courses
                    </span>
                  </div>
                </div>

                <div className="absolute md:top-[60%] top-[65%] right-[30%] lg:top-[560px] xl:top-[580px] lg:right-64 xl:right-96 rounded-lg px-3 py-2 bg-white/20 backdrop-blur-lg border border-white/30 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={hands}
                      alt="Electrical icon"
                      className="w-6 h-6 text-text-primary"
                    />
                    <span className="text-xs font-medium text-text-primary">
                      PhD in Electrical Engineering
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Description and CTA */}
          <div className=" space-y-8 lg:pb-40 xl:pl-24 xl:pr-20 lg:pl-16">
            <div className="space-y-4">
              <p className="text-text-primary text-base sm:text-sm leading-relaxed">
                Learn{" "}
                <span className="font-semibold text-primary/70">
                  embedded systems, motor control,
                </span>{" "}
                and{" "}
                <span className="font-semibold text-primary/70">
                  power electronics{" "}
                </span>
                through real-world engineering experience — not just theory.
              </p>
            </div>

            <div>
              <button
                onClick={handleEnrollNow}
                className="w-56 cursor-pointer inline-flex items-center justify-between bg-[#014C00] hover:bg-primary/80 text-white py-2 px-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="pl-3">Enroll Now</span>
                <span className="bg-white h-9 w-9 rounded-full flex items-center justify-center">
                  <LuArrowUpRight className="w-7 h-7 text-text-primary" />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Corner Labels */}
        <div className="hidden absolute bottom-96 md:top-[738px] md:left-[40%] lg:left-8 lg:right-8 md:flex justify-between items-end gap-2.5 md:gap-4.5">
          {/* Electrical Engineer */}
          <div className="flex items-center space-x-3 xl:pl-40">
            <div className="text-xl lg:text-3xl font-bold text-text-primary">
              <h3 className="">ELECTRICAL</h3>
              <h3 className="">ENGINEER</h3>
            </div>

            <Image
              src={electrical}
              alt="Haris Kovačević - Electrical Engineer and Software Developer"
              height={72}
              width={72}
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Software Developer */}
          <div className="flex items-center space-x-3 text-xl lg:text-3xl font-bold text-text-primary xl:pr-28">
            <Image
              src={software}
              alt="Haris Kovačević - Electrical Engineer and Software Developer"
              height={72}
              width={72}
              className="object-cover object-center"
              priority
            />

            <div>
              <h3>SOFTWARE</h3>
              <h3>DEVELOPER</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHomeSection;
