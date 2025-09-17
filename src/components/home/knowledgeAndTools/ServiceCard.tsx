"use client";

import type React from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";

interface ServiceCardProps {
  title: string;
  subtitle: string;
  titleBelow: string;
  backgroundImage: StaticImageData;
  tags?: string[];
  url: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  titleBelow,
  backgroundImage,
  tags = [],
  url,
}) => {

  const router = useRouter();

  const onReadMore = () => {
    router.push(url);
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Background Image */}
      <div className="relative min-h-[500px] md:min-h-[570px]">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Overlay */}
      <div className="top-52 md:top-40 xl:top-2/4 absolute inset-0 flex flex-col justify-between p-6 bg-secondary/10 lg:bg-transparent backdrop-blur-[3px]">
        {/* Top Content */}
        <div className="space-y-3 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-center">
            {title}
          </h3>
          <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-center">
            {titleBelow}
          </h3>
          <p className="text-base sm:text-lg font-medium opacity-90 text-center max-w-[80%] mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Middle Content - Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap my-4 items-center justify-center text-sm">
            {tags.map((tag, index) => (
              <span key={index} className="text-white/70 text-sm">
                {tag}
                {index !== tags.length - 1 && <span className="px-1">|</span>}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Content - Button */}
        <div className="mt-auto">
          <button
            onClick={onReadMore}
            className="cursor-pointer w-full text-white font-semibold py-3 px-6 rounded-full border border-white hover:bg-white hover:text-black border-opacity-30 hover:border-opacity-50 transition-all duration-200"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
