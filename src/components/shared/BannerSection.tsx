"use client";

import Image from "next/image";
import bannerBg from "@/assets/shared/banner/BannerBG.png";

interface BannerProps {
  title: string;
  titleBottom?: string;
  subtitle: string;
}

export default function BannerSection({ title, titleBottom, subtitle }: BannerProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[700px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerBg}
            alt="Modern house property"
            fill
            className="object-cover"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 font-medium">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-2xl mb-4 opacity-90 text-text-primary">
              {subtitle}
            </h1>
            <p className="text-4xl sm:text-5xl lg:text-5xl leading-tight text-text-primary">
              {title}
            </p>
            <p className="max-w-96 mx-auto text-4xl sm:text-5xl lg:text-5xl mb-4 leading-tight text-text-primary">
              {titleBottom} {" "}
              <span className="text-text-secondary relative inline-block">
                Experience.
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4"
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
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
