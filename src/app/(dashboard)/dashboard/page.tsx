"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash2, FileText, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useDeleteCourseByIdMutation,
  useGetCoursesQuery,
} from "@/redux/api/courseApi";
import { useGetAllResourcesQuery } from "@/redux/api/resourceApi";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  level: string;
  duration: number;
  courseType: string;
  price: number;
  discount: number;
  status: string;
  thumnail: string;
  discountedPrice: number;
}

interface Resource {
  id: string;
  title: string;
  topic: string;
  type: string;
  status: string;
  price: number;
  thumbnail: string;
  file: string;
  createdAt: string;
}

const ManageCourse = () => {
  const { data: coursesData } = useGetCoursesQuery({});
  const { data: resourcesData } = useGetAllResourcesQuery({});
  const [deleteCourseByIdFN] = useDeleteCourseByIdMutation();

  // Filter courses based on status
  const ongoingCourses =
    coursesData?.data?.filter(
      (course: Course) => course.status === "ONGOING"
    ) || [];
  const upcomingCourses =
    coursesData?.data?.filter(
      (course: Course) => course.status === "UPCOMING"
    ) || [];
  const resources = resourcesData?.data || [];

  const getFileTypeFromUrl = (url: string) => {
    if (!url) return "Unknown";
    const extension = url.split(".").pop()?.toLowerCase();
    return extension ? `.${extension}` : "Unknown";
  };
  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourseByIdFN(id).unwrap();
      toast.success("Course deleted successfully!");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    }
  };

  return (
    <div>
      <div className="py-6 mt-10 md:mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <Tabs defaultValue="on-going" className="w-full">
              {/* Tab List Container with responsive layout */}
              <div className="flex flex-col-reverse md:flex-row flex-wrap gap-3 mb-10 bg-white">
                <TabsList className="flex gap-3 flex-wrap">
                  <TabsTrigger
                    value="on-going"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#595959] data-[state=active]:text-[#333333] 
                    text-[#333333] border-b-2 border-gray-400 cursor-pointer text-xs sm:text-sm md:text-base px-1 py-0"
                  >
                    ON-GOING COURSES
                  </TabsTrigger>
                  <TabsTrigger
                    value="up-coming"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#595959] data-[state=active]:text-[#333333] text-[#333333]
                     border-b-2 border-gray-400 cursor-pointer text-xs sm:text-sm md:text-base px-1 py-0"
                  >
                    UPCOMING COURSES
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-[#595959] data-[state=active]:text-[#333333] text-[#333333] border-b-2 border-gray-400 cursor-pointer text-xs sm:text-sm md:text-base px-1 py-0"
                  >
                    RESOURCES
                  </TabsTrigger>
                </TabsList>
                <div className="flex gap-2 flex-wrap">
                  <Link href="/dashboard/create-course">
                    <button
                      className="flex gap-1 items-center 
                    flex-nowrap text-black hover:bg-primary hover:text-white
                    py-1 px-4 rounded-3xl border border-primary 
                    bg-[#FEFBC7] cursor-pointer"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-nowrap">Create new course</span>
                    </button>
                  </Link>
                  <Link href="/dashboard/create-resource">
                    <button
                      className="flex gap-1 items-center 
                    flex-nowrap  
                    py-1 px-4 rounded-3xl border border-primary 
                    bg-[#FEFBC7] cursor-pointer hover:bg-primary hover:text-white"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-nowrap">Create new resource</span>
                    </button>
                  </Link>
                </div>
              </div>

              <TabsContent value="on-going" className="space-y-6 mt-10 lg:mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-2 sm:p-0 justify-center">
                  {ongoingCourses.map((course: Course) => (
                    <div
                      key={course.id}
                      className="w-full max-w-md mx-auto sm:mx-0 sm:w-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={course.thumnail || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          fill
                        />
                      </div>

                      <div className="p-4 sm:p-6 flex flex-col flex-grow">
                        <div className="space-y-3 sm:space-y-4 flex-grow">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {course.subtitle}
                          </p>

                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                            {course.description}
                          </p>

                          <div className="flex items-center justify-between flex-wrap mt-4">
                            <div className="flex items-center gap-1">
                              <span className="text-xs sm:text-sm font-medium text-gray-900">
                                {course.level}
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500">
                                • {course.duration} hours
                              </span>
                            </div>
                            <div>
                              {course.discount > 0 && (
                                <div className="flex items-center gap-1">
                                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                                    {course.discount}% OFF
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="text-xs sm:text-sm font-bold text-gray-900 flex gap-3 items-center">
                              <span className="text-base">
                                {course.discountedPrice.toFixed(2)}
                              </span>
                              {course.discountedPrice !== course.price && (
                                <span className="relative font-light">
                                  €{course.price}
                                  <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-600 transform -translate-y-1/2"></span>
                                </span>
                              )}
                              {course.courseType === "FREE" && (
                                <span>FREE</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                          <Link
                            href={`/dashboard/manage-course/${course.id}`}
                            className="col-span-4 w-full"
                          >
                            <button
                              className="w-full bg-[#017F00] border border-[#379a36] text-white hover:text-white 
                       hover:bg-[#629162] p-2 sm:p-3 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-colors duration-200 
                       flex items-center justify-center gap-3 sm:gap-2 cursor-pointer text-xs sm:text-sm"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 19 19"
                                fill="none"
                              >
                                <path
                                  d="M6.53561 16.6073H18.293V18.6073H0.292969V14.3646L10.1925 4.46514L14.4351 8.70781L6.53561
             16.6073ZM11.6067 3.05093L13.728 0.929609C14.1186 0.539089 14.7517 0.539089 15.1422 0.929609L17.9707 
             3.75804C18.3612 4.14856 18.3612 4.78173 17.9707 5.17225L15.8493 7.29357L11.6067 3.05093Z"
                                  fill="white"
                                />
                              </svg>
                              <span>Edit Course</span>
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className=" bg-[#E6F2E6] p-2 rounded-full 
                     flex items-center justify-center cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="up-coming">
                {upcomingCourses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-2 sm:p-6 justify-center">
                    {upcomingCourses.map((course: Course) => (
                      <div
                        key={course.id}
                        className="w-full max-w-md mx-auto sm:mx-0 sm:w-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={course.thumnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-full h-full object-cover"
                            fill
                          />
                        </div>

                        <div className="p-4 sm:p-6 flex flex-col flex-grow">
                          <div className="space-y-3 sm:space-y-4 flex-grow">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500">
                              {course.subtitle}
                            </p>

                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                              {course.description}
                            </p>

                            <div className="flex items-center justify-between flex-wrap mt-auto">
                              <div className="flex items-center gap-1">
                                <span className="text-xs sm:text-sm font-medium text-gray-900">
                                  {course.level}
                                </span>
                                <span className="text-xs sm:text-sm text-gray-500">
                                  • {course.duration} hours
                                </span>
                              </div>
                              <div>
                                {course.discount > 0 && (
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                                      {course.discount}% OFF
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-gray-900 flex gap-3 items-center">
                                <span className="text-base">
                                  {course.discountedPrice.toFixed(2)}
                                </span>
                                {course.discountedPrice !== course.price && (
                                  <span className="relative font-light">
                                    €{course.price}
                                    <span className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-600 transform -translate-y-1/2"></span>
                                  </span>
                                )}
                                {course.courseType === "FREE" && (
                                  <span>FREE</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                            <Link
                              href={`/dashboard/manage-course/${course.id}`}
                              className="col-span-4 w-full"
                            >
                              <button
                                className="w-full bg-[#017F00] border border-[#379a36] text-white hover:text-white 
                              hover:bg-[#629162] p-2 sm:p-3 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-colors duration-200 
                              flex items-center justify-center gap-3 sm:gap-2 cursor-pointer text-xs sm:text-sm"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                >
                                  <path
                                    d="M6.53561 16.6073H18.293V18.6073H0.292969V14.3646L10.1925 4.46514L14.4351 8.70781L6.53561
                16.6073ZM11.6067 3.05093L13.728 0.929609C14.1186 0.539089 14.7517 0.539089 15.1422 0.929609L17.9707 
                3.75804C18.3612 4.14856 18.3612 4.78173 17.9707 5.17225L15.8493 7.29357L11.6067 3.05093Z"
                                    fill="white"
                                  />
                                </svg>
                                <span>Edit Course</span>
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="bg-[#E6F2E6] p-2 rounded-full 
                            flex items-center justify-center cursor-pointer hover:bg-[#017F00] text-white"
                            >
                              <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <h2 className="text-lg sm:text-xl font-semibold mb-2">
                      Upcoming Courses
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600">
                      No upcoming courses available.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources">
                <div className="container mx-auto px-4 py-8">
                  {resources.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-2 sm:p-6 justify-center">
                      {resources.map((resource: Resource) => (
                        <div
                          key={resource.id}
                          className="w-full max-w-md mx-auto sm:mx-0 sm:w-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={resource.thumbnail || "/placeholder.svg"}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                              fill
                            />
                          </div>

                          <div className="p-4 sm:p-6 flex flex-col flex-grow">
                            <div className="space-y-3 sm:space-y-4 flex-grow">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight line-clamp-2">
                                {resource.title}
                              </h3>

                              <div className="flex flex-wrap gap-2 sm:gap-3">
                                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                                  <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="font-medium">
                                    File type:
                                  </span>
                                  <span>
                                    {getFileTypeFromUrl(resource.file)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                                  <Tag className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="font-medium">Topic:</span>
                                  <span>{resource.topic}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 pt-4 sm:pt-6 mt-auto">
                              <Link
                                href={`/dashboard/edit-resource/${resource.id}`}
                                className="flex-1"
                              >
                                <button className="w-full bg-[#379a36] border border-[#379a36] text-white hover:text-[#379a36] hover:bg-transparent p-2 sm:p-3 px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 cursor-pointer text-xs sm:text-sm">
                                  <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                  Edit Resources
                                </button>
                              </Link>
                              <button className="p-2 sm:p-3 hover:text-black bg-green-100 text-black hover:bg-[#379a36] rounded-full transition-colors cursor-pointer duration-200">
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <h2 className="text-lg sm:text-xl font-semibold mb-2">
                        Resources
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        No resources available.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCourse;
