"use client";

import Image from "next/image";
import bannerBg from "@/assets/shared/banner/BannerBG.png";

interface BannerProps {
  title: string;
  titleBelow?: string;
  subtitle?: string;
}

export default function FaqBannerSection({
  title,
  titleBelow,
  subtitle,
}: BannerProps) {
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
        <div className={`w-full mx-auto relative z-10 flex items-center justify-center h-full px-4`}>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl leading-tight text-text-primary font-medium">{title}</h1>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl mb-4 leading-tight text-text-primary font-medium">{titleBelow}</h1>
            <p className="mb-4 opacity-90 text-text-primary">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
