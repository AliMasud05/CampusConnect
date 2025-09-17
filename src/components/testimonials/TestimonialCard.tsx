import type React from "react";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";
import { TCourseReview } from "@/types/review.type";

// type TestimonialCardProps = {
//   testmonial: TCourseReview;
// };

type SafeCourseReview = Pick<
  TCourseReview,
  "id" | "rating" | "comment" | "userId" | "courseId" | "createdAt"
> & {
  user?: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  course?: {
    id: string;
    title: string;
  };
};

type TestimonialCardProps = {
  testmonial: SafeCourseReview;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testmonial }) => {
  const quote = testmonial.comment;
  const name = testmonial.user?.name || "Anonymous";
  const title = testmonial.course?.title || "Untitled Course";
  const avatar = testmonial.user?.profileImage;

  const isImageUrl = avatar?.startsWith("http");

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      {/* Quote Icon */}
      <div className="mb-4 h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
        <FaQuoteLeft className="w-8 h-8 text-primary opacity-60" />
      </div>

      {/* Quote Text */}
      <div className="pb-3 mb-3 border-b border-slate-300">
        <p className="text-gray-700 text-sm leading-relaxed ">
          &quot;{quote}&quot;
        </p>
      </div>

      {/* Profile Section */}
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
          <Image
            src={isImageUrl ? avatar! : "https://github.com/shadcn.png"}
            alt={`${name} profile picture`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-900 font-semibold text-sm truncate">
            {name}
          </h4>
          <p className="text-gray-600 text-sm truncate">– {title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
