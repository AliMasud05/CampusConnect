"use client";

import Image from "next/image";
import bannerBg from "@/assets/shared/banner/BannerBG.png";
import { MdArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";

interface BannerProps {
  heading: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  lineBreak?: boolean; 
  titleBreak?: boolean; // Optional prop for title line break
}

export default function BannerSectionThree({
  heading,
  title,
  subtitle,
  buttonText,
  buttonLink,
  lineBreak,
  titleBreak
}: BannerProps) {
  const router = useRouter();

  const handleEnrollNow = () => {
    router.push(buttonLink);
  };

  return (
    <div className="bg-white overflow-x-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 gap-10">
          <div className="text-center max-w-4xl mx-auto space-y-3">
            <h3 className="text-2xl font-medium text-text-primary">{heading}</h3>
            <p className={`${titleBreak ? "lg:max-w-[540px] mx-auto" : ""} text-4xl sm:text-5xl lg:text-5xl mb-4 leading-tight font-medium text-text-primary`}>
              {title}
            </p>
            <h1 className={`${lineBreak ? "lg:max-w-[470px] mx-auto" : ""} text-xl mb-4 opacity-90 text-text-primary`}>
              {subtitle}
            </h1>
          </div>

          <div>
            <button
              onClick={handleEnrollNow}
              className="cursor-pointer flex items-center justify-between gap-3 bg-[#014C00] hover:bg-primary/80 text-white font-semibold py-2 pl-7 pr-2 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {buttonText}
              <span className="w-12 h-12 flex items-center justify-center bg-white text-text-primary rounded-full ml-2 transition-transform duration-200 hover:translate-x-1">
                <MdArrowOutward className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
