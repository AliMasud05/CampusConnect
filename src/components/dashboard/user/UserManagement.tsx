"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useGetAllUserQuery } from "@/redux/api/authApi";
import { format } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  role: "USER" | "SUPER_ADMIN";
  status: string;
  createdAt: string;
  updatedAt: string;
  enrollments: {
    id: string;
    userId: string;
    courseId: string;
    Amount: number;
    paymentStatus: string;
    enrolledAt: string;
    course: {
      id: string;
      title: string;
      subtitle: string;
    };
  }[];
  reviews: {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    courseId: string;
    createdAt: string;
  }[];
};

type UserApiResponse = {
  success: boolean;
  message: string;
  data: {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    data: User[];
  };
};

export default function UsersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const {
    data: userData,
    isLoading,
    isError,
  } = useGetAllUserQuery({
    page: currentPage,
    limit: limit,
  });

  // Define background colors for avatar placeholders
  const bgColors = [
    "bg-amber-100",
    "bg-cyan-100",
    "bg-yellow-100",
    "bg-purple-100",
    "bg-orange-100",
  ];

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MM/dd/yyyy");
    } catch {
      return "Unknown date";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">
            Error loading users. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const users = (userData as UserApiResponse)?.data?.data || [];
  const meta = (userData as UserApiResponse)?.data?.meta;
  const totalPages = meta ? Math.ceil(meta.total / meta.limit) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers to display with ellipsis for large datasets
 type PageItem =
   | { type: "page"; value: number }
   | { type: "ellipsis"; value: string };

 const getPageNumbers = (): PageItem[] => {
   const pageNumbers: PageItem[] = [];
   const maxVisiblePages = 7;
   const sidePages = 2;

   if (totalPages <= maxVisiblePages) {
     for (let i = 1; i <= totalPages; i++) {
       pageNumbers.push({ type: "page", value: i });
     }
   } else {
     pageNumbers.push({ type: "page", value: 1 });

     let startPage = Math.max(2, currentPage - sidePages);
     let endPage = Math.min(totalPages - 1, currentPage + sidePages);

     if (currentPage <= sidePages + 2) {
       startPage = 2;
       endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
     }

     if (currentPage >= totalPages - sidePages - 1) {
       startPage = Math.max(2, totalPages - maxVisiblePages + 2);
       endPage = totalPages - 1;
     }

     if (startPage > 2) {
       pageNumbers.push({ type: "ellipsis", value: "start-ellipsis" });
     }

     for (let i = startPage; i <= endPage; i++) {
       pageNumbers.push({ type: "page", value: i });
     }

     if (endPage < totalPages - 1) {
       pageNumbers.push({ type: "ellipsis", value: "end-ellipsis" });
     }

     if (totalPages > 1) {
       pageNumbers.push({ type: "page", value: totalPages });
     }
   }

   return pageNumbers;
 };

  console.log("users", users);

  return (
    <div className="min-h-screen bg-white overflow-y-visible">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
            All Users
          </h1>
          {meta && (
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, meta.total)} of {meta.total} users
            </div>
          )}
        </div>

        {users.length > 0 ? (
          <>
            <div className="space-y-4">
              {users.map((user, index) => {
                const bgColor = bgColors[index % bgColors.length];
                const latestEnrollment = user.enrollments?.[0];

                return (
                  <div
                    key={user.id}
                    className="bg-white rounded-lg py-4 px-6 flex flex-row items-center justify-between shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${bgColor} flex items-center justify-center overflow-hidden`}
                      >
                        <Image
                          src={
                            user.profileImage ||
                            "https://avatar.iran.liara.run/public"
                          }
                          alt={`${user.name}'s avatar`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover border border-white shadow-lg rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg md:text-2xl">
                          {user.name}
                        </h3>
                        <p className="text-[13px] md:text-sm text-[#595959] mt-0.5">
                          {latestEnrollment
                            ? `Enrolled - ${latestEnrollment.course.title}`
                            : user.role === "SUPER_ADMIN"
                            ? "Administrator"
                            : "Not enrolled in any course"}
                        </p>
                        <p className="text-[13px] md:text-sm text-[#595959] mt-0.5">
                          {latestEnrollment
                            ? `Joined date: ${formatDate(
                                latestEnrollment.enrolledAt
                              )}`
                            : `Account created: ${formatDate(user.createdAt)}`}
                        </p>
                      </div>
                    </div>

                    <Link href={`/dashboard/user-management/${user.id}`}>
                      <Button
                        size="sm"
                        className="text-sm md:text-base md:px-5 md:py-5 
                       text-gray-700 hover:bg-gray-50 bg-transparent border border-black/40 rounded-full hover:text-gray-900 transition-colors cursor-pointer"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {/* Previous Button */}
                <Button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {/* Page Numbers */}
             {/* Page Numbers */}
<div className="flex items-center gap-1">
  {getPageNumbers().map((item) => {
    if (item.type === "ellipsis") {
      return (
        <span
          key={item.value}
          className="px-3 py-2 text-sm font-medium text-gray-400 cursor-default"
        >
          ...
        </span>
      );
    }

    return (
      <Button
        key={item.value}
        onClick={() => handlePageChange(item.value)}
        variant={currentPage === item.value ? "default" : "outline"}
        size="sm"
        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors min-w-[40px] ${
          currentPage === item.value
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700"
        }`}
      >
        {item.value}
      </Button>
    );
  })}
</div>

                {/* Next Button */}
                <Button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {/* Pagination Info */}
            {meta && (
              <div className="mt-4 text-center text-sm text-gray-500">
                Page {currentPage} of {totalPages} • Total {meta.total} users
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
