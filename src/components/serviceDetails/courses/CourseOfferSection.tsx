import type React from "react";
import Image from "next/image";

import topLeft from "@/assets/serviceDetails/courses/topLeft.png";
import topMiddle from "@/assets/serviceDetails/courses/topMiddle.png";
import topRight from "@/assets/serviceDetails/courses/topRight.png";
import bottomLeft from "@/assets/serviceDetails/courses/bottomLeft.png";
import bottomMiddle from "@/assets/serviceDetails/courses/bottomMiddle.png";
import bottomRight from "@/assets/serviceDetails/courses/bottomRight.png";
import softStar from "@/assets/about/icons/SoftStar.svg";

const CourseOfferSection: React.FC = () => {
  return (
    <section className="w-full bg-white px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 h-[700px]">
              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg md:mt-16">
                <Image
                  src={topLeft}
                  alt="Blue circuit board with electronic components"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={topMiddle}
                  alt="Green circuit board with electronic components"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg md:mt-16">
                <Image
                  src={topRight}
                  alt="Close-up of microprocessor chip on circuit board"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={bottomLeft}
                  alt="Electronic circuit board components"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden md:block relative h-72 rounded-2xl overflow-hidden shadow-lg md:-mt-16">
                <Image
                  src={bottomMiddle}
                  alt="Green circuit board with various components"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="hidden md:block relative h-72 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={bottomRight}
                  alt="Power electronics with electrical sparks"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 relative">
            {/* Main Heading */}
            <div className="space-y-4">
              <div className="flex items-center">
                <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
                  What These{" "}
                  <span className="relative text-text-secondary">
                    Courses
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3"
                      viewBox="0 0 100 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10C25 2 50 2 98 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  Offer
                </h2>
              </div>
            </div>

            <div className="absolute -top-20 -right-6 md:-top-[20%] xl:right-[16%] xl:-top-[30%] lg:-right-2 md:right-[18%]">
              <Image
                src={softStar}
                alt="Soft star icon"
                height={150}
                width={150}
              />
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                My courses focus on doing, not just watching. Every topic is
                taught through real projects so you can apply what you learn
                instantly.
              </p>
            </div>

            {/* Popular Topics */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Popular Topics:
              </h3>

              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Power electronics & embedded systems
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    C & assembly for engineers
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Converters Modelling
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Control loop development (digital & analog)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseOfferSection;
