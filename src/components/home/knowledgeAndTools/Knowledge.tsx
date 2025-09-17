"use client";

import ServiceCard from "./ServiceCard";

import onlineCourses from "@/assets/home/knowledgeAndTools/OnlineCourses.png";
import softwareDevelopment from "@/assets/home/knowledgeAndTools/SoftwareDevelopment.png";
import techResources from "@/assets/home/knowledgeAndTools/TechResources.png";
import { StaticImageData } from "next/image";

interface Service {
  id: number;
  title: string;
  titleBelow: string;
  subtitle: string;
  backgroundImage: StaticImageData;
  tags: string[];
  url: string;
}

const servicesData: Service[] = [
  {
    id: 1,
    title: "Online Courses",
    titleBelow: "",
    subtitle: "Practical, Project-Based Learning",
    backgroundImage: onlineCourses,
    tags: ["lifetime access", "downloadable files"],
    url: "/service-details/courses",
  },
  {
    id: 2,
    title: "Software",
    titleBelow: "Development",
    subtitle: "Custom Software Solutions for You",
    backgroundImage: softwareDevelopment,
    tags: ["power electronics", "embedded systems", "automation tools"],
    url: "/service-details/software-devlopment",
  },
  {
    id: 3,
    title: "Tech",
    titleBelow: "Resources",
    subtitle: "Downloadable Tools, Templates & More",
    backgroundImage: techResources,
    tags: [],
    url: "/resources",
  },
];

export default function Knowledge() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full font-medium bg-bg-primary text-text-secondary">
              Services
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight mb-6">
            <span className="relative text-text-secondary inline-block">
              Empowering
              <svg
                className="absolute -bottom-3 left-0 w-full h-4"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8 C20 0, 80 0, 100 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            You Through Knowledge & Tools
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-6xl mx-auto pt-8">
            Whether you&apos;re looking to learn, build, or access ready-to-use
            resources — I&apos;m here to help you grow with practical solutions
            and proven expertise. I offer specialized services in embedded
            systems, power electronics, control engineering, and technical
            consulting — all grounded in real industry experience and academic
            excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              titleBelow={service.titleBelow}
              subtitle={service.subtitle}
              backgroundImage={service.backgroundImage}
              tags={service.tags}
              url={service.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
