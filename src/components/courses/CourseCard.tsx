"use client";

import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { TCourse } from "@/types/course.type";

const CourseCard: React.FC<TCourse> = ({
  id,
  title,
  description,
  price,
  thumnail,
  reviews,
  releaseDate,
  status,
  discount,
  discountedPrice,
}) => {
  const router = useRouter();
  const formatedReleaseDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('en-US')
    : '';

  const handleSeeDetailsBtn = () => {
    router.push(`/courses/${id}`);
  };

  const handleEnrollNowBtn = () => {
    router.push(`/courses/${id}/payment`);
  };

  const averageRating =
    reviews?.length > 0
      ? Math.round(
          reviews.reduce((acc, r) => acc + r?.rating, 0) / reviews?.length
        )
      : 0;

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image src={thumnail} alt={title} fill className="object-cover" />
      </div>

      {/* Course Content */}
      <div className="px-6 pt-6 min-h-72 flex flex-col justify-between">
        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-3 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Rating and Price */}
        <div className="">
          <div className="flex justify-between px-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-text-primary">
                {averageRating}/5
              </span>
              <div className="flex space-x-1">{renderStars(averageRating)}</div>
            </div>
            {status === "UPCOMING" ? (
              <div className="flex text-xl font-semibold gap-2">
                <span>Release</span> :
               <span>{formatedReleaseDate}</span>
              </div>
            ) : (
              <></>
            )}
          </div>

          {discount > 0 ? (
            <div className="text-2xl md:text-3xl font-bold text-text-primary pt-3 pb-4 flex items-end gap-3">
              € {discountedPrice.toFixed(2)}
              <p className="text-xl text-text-primary/70 line-through decoration-1">
                € {price.toFixed(2)}
              </p>
            </div>
          ) : (
            <div className="text-2xl md:text-3xl font-bold text-text-primary pt-3 pb-4">
              € {price.toFixed(2)}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div>
        <div className="px-6">
          {status === "ONGOING" && discount > 0 ? (
            <p className="text-[#FF00C8]">Get {discount}% discount.</p>
          ) : status === "UPCOMING" && discount > 0 ? (
            <p className="text-[#FF00C8]">
              Get {discount}% discount for advance enrollment.
            </p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>

        <div className="flex flex-col-reverse md:flex-row gap-3 px-6 pb-6 pt-5">
          <button
            onClick={handleEnrollNowBtn}
            className="cursor-pointer flex-1 bg-text-secondary hover:bg-primary text-white font-semibold py-3 px-4 rounded-full transition-colors duration-200 focus:outline-none"
          >
            Enroll Now
          </button>
          <button
            onClick={handleSeeDetailsBtn}
            className="cursor-pointer flex-1 bg-white hover:bg-primary hover:text-white text-text-secondary font-semibold py-3 px-4 rounded-full border border-text-secondary transition-colors duration-200"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
