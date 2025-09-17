"use client";

import React from "react";
import classes from "@/assets/courseDetails/Classes.png";
import duration from "@/assets/courseDetails/Duration.png";
import language from "@/assets/courseDetails/Language.png";
import skill from "@/assets/courseDetails/Skill.png";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";

type InfoItem = {
  label: string;
  value: string;
  logo: StaticImageData;
};

// Utility function to convert minutes into "X h Y min" format
const formatDuration = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

// Utility function to map SkillLevel to a user-friendly format
const formatSkillLevel = (skillLevel: string): string => {
  switch (skillLevel.toUpperCase()) {
    case "BEGINNER":
      return "Beginner";
    case "INTERMEDIATE":
      return "Intermediate";
    case "ADVANCED":
      return "Advanced";
    default:
      return "N/A"; // Default fallback
  }
};

const SkillLevelSection = () => {
  const params = useParams();

  const { data: courses } = useGetCourseByIdQuery(params.id);

  // Dynamically format the duration and skill level values
  const items: InfoItem[] = [
    {
      label: "Skill Level",
      value: courses?.data?.level
        ? formatSkillLevel(courses.data.level)
        : "N/A",
      logo: skill,
    },
    {
      label: "Duration",
      value: courses?.data?.duration
        ? formatDuration(Number(courses.data.duration))
        : "N/A",
      logo: duration,
    },
    {
      label: "Language",
      value: courses?.data?.language || "N/A",
      logo: language,
    },
    {
      label: "Classes",
      value: courses?.data?.classes || "N/A",
      logo: classes,
    },
  ];

  return (
    <div className="container md:max-w-4xl mx-auto bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 px-10 py-5 rounded-2xl flex flex-col items-center shadow-2xl"
          >
            <Image
              src={item.logo}
              alt={item.label}
              width={40}
              height={40}
              className="mb-4"
            />

            <h3 className="text-center text-lg font-semibold text-text-primary">
              {item.label}:
            </h3>
            <p className="text-center font-medium text-text-primary   mb-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <>
    <h3 className="text-lg font-semibold text-gray-900 tracking-wider mb-2">
      {label}
    </h3>
    <p className="text-sm font-medium capitalize text-gray-500">{value}</p>
  </>
);

export default SkillLevelSection;
