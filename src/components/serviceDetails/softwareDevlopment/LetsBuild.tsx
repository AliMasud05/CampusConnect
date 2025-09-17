import type React from "react";
import Image from "next/image";
import top from "@/assets/resources/top.png";
import bottom from "@/assets/resources/bottom.png";
import softStar from "@/assets/about/icons/SoftStar.svg";

const LetsBuild: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
              Software Development
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
            From Idea to Execution — Let&apos;s{" "}
            <span className="relative text-text-secondary">
              Build
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
            It Right.
          </h2>

          <p className="text-gray-600 text-base sm:text-lg leading-relaxed py-5">
            From motor control firmware to converter logic — I develop embedded
            software that runs reliably under pressure, on real hardware, and in
            real time.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Images */}
          <div className="relative">
            {/* Image Container */}
            <div className="relative">
              {/* Top Image - Laptop with code */}
              <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
                <div className="w-96 h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={top.src}
                    alt="Laptop with code and electronic components"
                    fill
                    className="object-cover rounded-2xl"
                    priority
                  />
                </div>
              </div>

              {/* Bottom Image - Circuit board */}
              <div className="hidden md:block absolute -bottom-8 -right-4 sm:-bottom-12 sm:-right-8 lg:-bottom-16 lg:right-16 z-20 w-3/4 max-w-sm">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={bottom.src}
                    alt="Electronic circuit board with components"
                    fill
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 mt-16 lg:mt-0 relative">
            {/* What You'll Find Here */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-medium text-text-primary leading-tight">
                What I Can{" "}
                <span className="relative text-text-secondary">
                  Build for
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
                You
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed pr-3">
                I specialize in bridging hardware and software, creating digital
                systems that talk to real-world devices and deliver meaningful
                results.
              </p>
            </div>

            <div className="hidden md:block absolute md:-top-16 xl:-top-24 xl:right-[25%] lg:-right-10 lg:-top-33 md:right-[20%]">
              <Image
                src={softStar}
                alt="Soft star icon"
                height={150}
                width={150}
              />
            </div>

            {/* Examples Section */}
            <div className="space-y-6">
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                Examples:
              </h4>

              <ul className="space-y-1">
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Embedded Firmware for Microcontrollers
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Control Algorithms & DSP
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Model-Based Software Design
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="flex-shrink-0 w-1 h-1 bg-text-primary rounded-full mr-4"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">
                    System Integration & Tuning
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

export default LetsBuild;
