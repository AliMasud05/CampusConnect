"use client";

import Image from "next/image";
import bannerBg from "@/assets/shared/banner/BannerBG.png";
import softStar from "@/assets/about/icons/SoftStar.svg";

interface BannerProps {
  title: string;
  titleBelow?: string;
  subtitle?: string;
}

export default function CourseBanner({
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
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-5xl leading-tight text-text-primary font-medium">{title}</h1>
            <h1 className="text-4xl sm:text-5xl lg:text-5xl mb-4 leading-tight text-text-primary font-medium">{titleBelow}</h1>
            <p className="mb-4 opacity-90 text-text-primary max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="absolute top-[15%] md:top-[20%] xl:right-[33%] lg:right-[24%] md:right-[15%] right-1">
          <Image src={softStar} alt="Soft star icon" height={150} width={150} />
        </div>
      </div>
    </div>
  );
}
