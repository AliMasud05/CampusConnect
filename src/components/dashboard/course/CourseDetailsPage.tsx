/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import {
  Calendar,
  Clock,
  Edit,
  Euro,
  Globe,
  GraduationCap,
  Loader2,
  Percent,
  Play,
  Star,
  Users,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import UpdateCourseForm from "./UpdateCourseForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const { data: courseData, isLoading, error } = useGetCourseByIdQuery(id);
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center">
          <Loader2 className="w-6 h-6 mr-2 animate-spin" />
          Loading course details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <h2 className="text-xl font-semibold mb-2">Error Loading Course</h2>
          <p>Failed to load course details. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!courseData?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">
          <h2 className="text-xl font-semibold mb-2">Course Not Found</h2>
          <p>The course you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const course = courseData.data;

  // Sort learningData by order
  const sortedLearningData = course.learningData
    ? [...course.learningData].sort((a, b) => a.order - b.order)
    : [];

  // Sort modules by order
  const sortedModules = course.modules
    ? [...course.modules].sort((a, b) => a.order - b.order)
    : [];

  if (isEditing) {
    return (
      <UpdateCourseForm
        courseId={id as string}
        courseData={course}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg mb-8">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{course.subtitle}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created: {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Updated: {new Date(course.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-text-secondary text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Course
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Course Media */}
              <div className="lg:col-span-1 space-y-6">
                {/* Thumbnail */}
                {course.thumnail && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Course Thumbnail
                    </h3>
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={course.thumnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-thumbnail.png";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Demo Video */}
                {course.demoVideo && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Demo Video
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                          <div className="text-center">
                            <Play className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">
                              Click to watch demo
                            </p>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[80vw] max-h-[90vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Course Demo Video</DialogTitle>
                        </DialogHeader>
                        <div className="aspect-video w-full">
                          <iframe
                            src={course.demoVideo}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}

                {/* Course Stats */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Course Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        Enrollments
                      </span>
                      <span className="font-semibold">
                        {course.enrollments?.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2" />
                        Reviews
                      </span>
                      <span className="font-semibold">
                        {course.reviews?.length || 0}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-600">
                        <Video className="w-4 h-4 mr-2" />
                        Modules
                      </span>
                      <span className="font-semibold">
                        {course.modules?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Course Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Course Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Course Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold flex items-center">
                          <Euro className="w-4 h-4 mr-1" />
                          {course.price}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discount:</span>
                        <span className="font-semibold flex items-center">
                          {course.discount}
                          <Percent className="w-4 h-4 mr-1" />
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          After Discount Price:
                        </span>
                        <span className="font-semibold flex items-center">
                          <Euro className="w-4 h-4 mr-1" />
                          {course.discountedPrice}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.courseType === "PAID"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {course.courseType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.level === "BEGINNER"
                              ? "bg-green-100 text-green-800"
                              : course.level === "INTERMEDIATE"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {course.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.duration} hours
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Language:</span>
                        <span className="font-semibold flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          {course.language}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Classes:</span>
                        <span className="font-semibold flex items-center">
                          <GraduationCap className="w-4 h-4 mr-1" />
                          {course.classes}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Status & Release
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === "ONGOING"
                              ? "bg-green-100 text-green-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      {course.releaseDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Release Date:</span>
                          <span className="font-semibold">
                            {new Date(course.releaseDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Course Learning Data */}
                {sortedLearningData.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      What Will Students Learn?
                    </h3>
                    <div className="space-y-4">
                      {sortedLearningData.map((item: any, index: number) => (
                        <div
                          key={item.id}
                          className="flex items-start space-x-2"
                        >
                          <div className="flex-shrink-0">
                            <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-700">{item.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Course Description */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Course Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Modules */}
                {sortedModules.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Course Modules
                    </h3>
                    <div className="space-y-4">
                      {sortedModules.map((module: any, index: number) => (
                        <div
                          key={module.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Module {index + 1}: {module.title}
                          </h4>
                          {module.videos && module.videos.length > 0 && (
                            <div className="ml-4">
                              <p className="text-sm text-gray-600 mb-2">
                                {module.videos.length} videos
                              </p>
                              <ul className="space-y-1">
                                {[...module.videos]
                                  .sort((a, b) => a.order - b.order)
                                  .map((video: any, videoIndex: number) => (
                                    <li
                                      key={video.id}
                                      className="text-sm text-gray-700"
                                    >
                                      {videoIndex + 1}. {video.title}
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enrollments */}
                {course.enrollments && course.enrollments.length > 0 && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Recent Enrollments
                    </h3>
                    <div className="space-y-3">
                      {course.enrollments.slice(0, 5).map((enrollment: any) => (
                        <div
                          key={enrollment.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              Student ID: {enrollment.userId}
                            </p>
                            <p className="text-sm text-gray-600">
                              Enrolled:{" "}
                              {new Date(
                                enrollment.enrolledAt
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              €{enrollment.Amount}
                            </p>
                            <p
                              className={`text-xs px-2 py-1 rounded-full ${
                                enrollment.paymentStatus === "SUCCEEDED"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {enrollment.paymentStatus}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
