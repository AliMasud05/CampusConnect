/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CircularProgress from "@/components/courses/progress";
import { useGetUserByIdQuery } from "@/redux/api/authApi";
import { Euro } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

// Define types based on your API response
interface Payment {
  id: string;
  courseId: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentAmount: number;
  payableAmount: number;
  paymentDate: string;
  transactionId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface Course {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  releaseDate: string;
}

interface ProgressSummary {
  overallProgress: number;
  lastWatched: string;
  completedVideos: number;
  inProgressVideos: number;
  totalVideos: number;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  Amount: number;
  discount: number;
  paymentStatus: string;
  enrolledAt: string;
  course: Course;
  progressSummary: ProgressSummary;
}




export default function UserDetailsPage() {
  
  const { id } = useParams<{ id: string }>();
  const {
    data: userDataResponse,
    isLoading,
    isError,
  } = useGetUserByIdQuery({ id });

  if (isLoading || isError || !userDataResponse?.data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg text-gray-600">
          {isLoading ? "Loading..." : "Failed to load user data"}
        </p>
      </div>
    );
  }

  const user = userDataResponse.data;

  // Calculate total payment amount
const totalPaymentAmount: number = user.payments?.reduce(
    (total: number, payment: Payment) => total + (payment.paymentAmount || 0),
    0
);
// 
  // Calculate total discount
const totalDiscount: number =
 ( user.totalEnrollCourseOriginalPrice - user.totalEnrollmentAmount)|| 0;

  // Calculate average course progress
// const averageProgress: number = user.enrollments && user.enrollments.length > 0
//     ? Math.round(
//             user.enrollments.reduce(
//                 (acc: number, e: Enrollment) => acc + (e.progressSummary?.overallProgress || 0),
//                 0
//             ) / user.enrollments.length
//         )
//     : 0;

  // Format date function
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto md:px-6 md:py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">
          User Details
        </h1>
        <div className="shadow-md rounded-2xl p-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-18 h-18 rounded-full bg-cyan-100 overflow-hidden flex-shrink-0">
                <Image
                  src={
                    user.profileImage || "https://avatar.iran.liara.run/public"
                  }
                  alt={`${user.name}'s avatar`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-1 leading-10 tracking-tighter">
                  {user.name}
                </h2>
                <p className="text-base text-gray-600 mb-0.5 flex gap-4">
                  <span>Email:</span>
                  <span>{user.email}</span>
                </p>
                <p className="text-base text-gray-600 flex gap-2">
                  <span>Mobile:</span>
                  <span>{user.phoneNumber || "No phone number"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Course & Payment Details */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="md:text-4xl text-3xl font-semibold leading-6 text-gray-900">
              Course & Payment details
            </h3>
            <hr className="border-black/60 border-1 md:w-[48%] w-full rounded-2xl my-6" />

            {/* Enrolled Courses */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Enrolled Courses
              </h4>
              {user.enrollments && user.enrollments.length > 0 ? (
                user.enrollments.map((enrollment:any) => (
                  <div
                    key={enrollment.id}
                    className="mb-4 p-4 bg-gray-50 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">
                          Course Name:
                        </span>
                        <p className="text-lg font-semibold text-gray-900">
                          {enrollment.course?.title || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">Subtitle:</span>
                        <p className="text-lg font-medium text-gray-700">
                          {enrollment.course?.subtitle || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">
                          Joined Date:
                        </span>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatDate(enrollment.enrolledAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">
                          Payment Status:
                        </span>
                        <p
                          className={`text-lg font-semibold ${
                            enrollment.paymentStatus === "SUCCEEDED"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {enrollment.paymentStatus}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">Amount:</span>
                        <p className="text-lg font-semibold text-gray-900 flex items-center">
                          <Euro size={20} className="mr-1" />
                          {enrollment.Amount}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-gray-600">Discount:</span>
                        <p className="text-lg font-semibold text-blue-600 flex items-center">
                          <Euro size={20} className="mr-1" />
                          {enrollment.discount?.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Progress Display */}
                    <div className="flex items-center justify-center">
                      <CircularProgress
                        progress={
                          enrollment.progressSummary?.overallProgress || 0
                        }
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 bg-gray-50 rounded-lg text-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14,2 14,8 20,8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10,9 9,9 8,9" />
                    </svg>
                    <p className="text-lg font-medium text-gray-500">
                      No courses enrolled
                    </p>
                    <p className="text-sm text-gray-400">
                      This user hasn&#39;t enrolled in any courses yet.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Metrics Cards */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 items-center mt-6">
              {/* Average Course Progress */}
              {/* <div className="text-center flex flex-col justify-center items-center gap-3 -mt-4">
                <h3 className="text-xl font-semibold">Course Progress</h3>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="80"
                    viewBox="0 0 91 92"
                    fill="none"
                  >
                    <path
                      d="M86.5201 46C88.9943 46 91.0229 43.9894 90.7797 41.5272C89.9954 33.5877 87.1336 25.9654 82.4466 19.4444C76.885 11.7066 69.0344 5.91029 60.0023 2.87305C50.9701 -0.164186 41.2124 -0.288989 32.1055 2.51624C22.9986 5.32148 15.0023 10.9152 9.24467 18.5082C3.48701 26.1012 0.258603 35.3103 0.0148841 44.8363C-0.228835 54.3623 2.52444 63.7244 7.88629 71.6019C13.2481 79.4794 20.9479 85.4747 29.8994 88.7419C37.4432 91.4954 45.5551 92.1942 53.4117 90.8069C55.8482 90.3767 57.2367 87.8808 56.5691 85.4983C55.9014 83.1159 53.4293 81.7551 50.9831 82.1264C44.9468 83.0426 38.7515 82.4348 32.9715 80.3251C25.7828 77.7013 19.5992 72.8866 15.2932 66.5604C10.9872 60.2341 8.77614 52.7156 8.97186 45.0654C9.16759 37.4153 11.7603 30.0197 16.3841 23.9219C21.008 17.8241 27.4296 13.3319 34.7431 11.0791C42.0567 8.82629 49.893 8.92651 57.1465 11.3657C64.4 13.8048 70.7047 18.4597 75.171 24.6738C78.7622 29.6701 81.0191 35.4715 81.7658 41.5311C82.0684 43.9868 84.0458 46 86.5201 46Z"
                      fill="#017F00"
                    />
                  </svg>
                  <p className="absolute top-6 left-5 font-semibold text-xl">
                    {averageProgress}%
                  </p>
                </div>
              </div> */}

              {/* <div className="h-33 w-[2px] bg-black hidden md:block"></div> */}

              {/* Total Payment Amount */}
              <div className="flex flex-col items-center justify-center gap-3">
                <h3 className="text-xl font-semibold">Total Payment</h3>
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="54"
                    height="54"
                    viewBox="0 0 49 49"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_192_935)">
                      <path
                        d="M21.5 15.4993V12.4993H3.5C1.847 12.4993 0.5 13.8463 0.5 15.4993V21.4993H22.133C21.716 19.6663 21.5 17.6923 21.5 15.4993ZM48.377 27.4993C46.331 30.6523 43.211 33.3343 38.741 35.9023C38.054 36.2953 37.28 36.4993 36.5 36.4993C35.72 36.4993 34.946 36.2952 34.268 35.9083C29.798 33.3343 26.678 30.6493 24.629 27.4993H0.5V42.4993C0.5 44.1553 1.847 45.4993 3.5 45.4993H45.5C47.156 45.4993 48.5 44.1553 48.5 42.4993V27.4993H48.377ZM14 36.4993H8C7.172 36.4993 6.5 35.8273 6.5 34.9993C6.5 34.1713 7.172 33.4993 8 33.4993H14C14.828 33.4993 15.5 34.1713 15.5 34.9993C15.5 35.8273 14.828 36.4993 14 36.4993Z"
                        fill="#017F00"
                      />
                      <path
                        d="M47.591 8.12225L37.091 3.62225C36.9038 3.54208 36.7022 3.50075 36.4985 3.50075C36.2948 3.50075 36.0932 3.54208 35.906 3.62225L25.406 8.12225C24.857 8.35625 24.5 8.89925 24.5 9.49925V15.4992C24.5 23.7522 27.551 28.5762 35.753 33.3012C35.984 33.4332 36.242 33.4992 36.5 33.4992C36.758 33.4992 37.016 33.4332 37.247 33.3012C45.449 28.5882 48.5 23.7642 48.5 15.4992V9.49925C48.5 8.89925 48.143 8.35625 47.591 8.12225ZM42.173 14.9382L36.173 22.4382C35.885 22.7922 35.453 22.9992 35 22.9992H34.937C34.7011 22.989 34.4709 22.9233 34.2651 22.8076C34.0592 22.6919 33.8834 22.5294 33.752 22.3332L30.752 17.8332C30.293 17.1432 30.479 16.2132 31.169 15.7542C31.853 15.2982 32.786 15.4782 33.248 16.1712L35.111 18.9642L39.827 13.0662C40.346 12.4212 41.291 12.3192 41.936 12.8322C42.584 13.3452 42.686 14.2902 42.173 14.9382Z"
                        fill="#017F00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_192_935">
                        <rect
                          width="48"
                          height="48"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="flex items-center text-3xl font-bold">
                    <span>
                      <Euro size={36} strokeWidth={2.25} />
                    </span>
                    <span>{totalPaymentAmount.toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <div className="h-33 w-[2px] bg-black hidden md:block"></div>

              {/* Total Discount */}
              <div className="flex flex-col items-center gap-3 justify-center -mt-1">
                <h3 className="text-xl font-semibold">Total Discount</h3>
                <div className="flex flex-col items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="49"
                    height="49"
                    viewBox="0 0 49 49"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_194_1113)">
                      <path
                        d="M45.3098 25.1217C45.2145 24.9283 45.165 24.7156 45.165 24.5C45.165 24.2844 45.2145 24.0717 45.3098 23.8783L47.1 20.216C48.0968 18.1768 47.307 15.7464 45.3021 14.6826L41.7012 12.772C41.5104 12.6715 41.3453 12.5286 41.2186 12.3542C41.0919 12.1798 41.0069 11.9786 40.9703 11.7662L40.2661 7.75096C39.8739 5.51541 37.806 4.01317 35.5591 4.33107L31.5229 4.90201C31.3096 4.93285 31.0919 4.91424 30.8869 4.84761C30.6819 4.78098 30.4949 4.66811 30.3405 4.51773L27.4107 1.68349C25.7794 0.105315 23.2237 0.105221 21.5925 1.68349L18.6626 4.51801C18.5082 4.66836 18.3212 4.7812 18.1162 4.84783C17.9111 4.91446 17.6936 4.93309 17.4802 4.90229L13.444 4.33135C11.1964 4.01326 9.12917 5.51569 8.73702 7.75124L8.03277 11.7662C7.99617 11.9787 7.91124 12.1799 7.78453 12.3543C7.65782 12.5287 7.49273 12.6717 7.302 12.7722L3.70108 14.6828C1.69616 15.7465 0.90641 18.1771 1.90315 20.2163L3.6933 23.8785C3.78859 24.0719 3.83815 24.2846 3.83815 24.5002C3.83815 24.7158 3.78859 24.9285 3.6933 25.1219L1.90306 28.7841C0.906316 30.8233 1.69606 33.2537 3.70099 34.3175L7.3019 36.2281C7.49266 36.3285 7.65777 36.4715 7.7845 36.6459C7.91122 36.8203 7.99617 37.0215 8.03277 37.2339L8.73702 41.2491C9.09402 43.2843 10.8391 44.7115 12.8447 44.7113C13.0422 44.7113 13.2426 44.6974 13.4441 44.6689L17.4803 44.098C17.6936 44.0671 17.9113 44.0857 18.1163 44.1524C18.3213 44.219 18.5083 44.3319 18.6627 44.4823L21.5925 47.3165C22.4083 48.1057 23.4547 48.5002 24.5016 48.5001C25.5481 48.5 26.5952 48.1055 27.4106 47.3165L30.3405 44.4823C30.6566 44.1766 31.0875 44.0369 31.5229 44.098L35.5591 44.6689C37.807 44.9869 39.8739 43.4846 40.2661 41.249L40.9704 37.234C41.007 37.0216 41.092 36.8204 41.2187 36.646C41.3454 36.4715 41.5105 36.3286 41.7012 36.2281L45.3021 34.3175C47.307 33.2538 48.0968 30.8232 47.1 28.784L45.3098 25.1217ZM18.9646 12.0421C21.7632 12.0421 24.0401 14.319 24.0401 17.1176C24.0401 19.9162 21.7632 22.1931 18.9646 22.1931C16.166 22.1931 13.8891 19.9162 13.8891 17.1176C13.8891 14.319 16.166 12.0421 18.9646 12.0421ZM16.3449 34.6141C16.0746 34.8844 15.7203 35.0196 15.3661 35.0196C15.012 35.0196 14.6576 34.8845 14.3874 34.6141C13.8468 34.0736 13.8468 33.1971 14.3874 32.6565L32.6581 14.3858C33.1986 13.8452 34.0751 13.8452 34.6157 14.3858C35.1563 14.9264 35.1563 15.8028 34.6157 16.3434L16.3449 34.6141ZM30.0383 36.958C27.2397 36.958 24.9628 34.6811 24.9628 31.8825C24.9628 29.0839 27.2397 26.807 30.0383 26.807C32.8369 26.807 35.1138 29.0839 35.1138 31.8825C35.1138 34.6811 32.8369 36.958 30.0383 36.958Z"
                        fill="#017F00"
                      />
                      <path
                        d="M30.0369 29.5756C28.7648 29.5756 27.7298 30.6105 27.7298 31.8825C27.7298 33.1546 28.7647 34.1895 30.0369 34.1895C31.309 34.1895 32.3439 33.1546 32.3439 31.8825C32.3439 30.6105 31.309 29.5756 30.0369 29.5756ZM18.9632 14.8105C17.6912 14.8105 16.6562 15.8454 16.6562 17.1175C16.6562 18.3896 17.6912 19.4246 18.9632 19.4246C20.2353 19.4246 21.2703 18.3897 21.2703 17.1175C21.2702 15.8455 20.2353 14.8105 18.9632 14.8105Z"
                        fill="#017F00"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_194_1113">
                        <rect
                          width="48"
                          height="48"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="flex items-center text-3xl font-bold text-center">
                    <Euro size={36} strokeWidth={2.25} />
                    <span>{totalDiscount.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
