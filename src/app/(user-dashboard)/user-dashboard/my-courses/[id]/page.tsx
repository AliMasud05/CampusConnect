/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import CircularProgress from "@/components/courses/progress";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetCourseByIdQuery } from "@/redux/api/courseApi";
import {
  useCreateProgressMutation,
  useGetProgressByIdQuery,
} from "@/redux/api/progressApi";
import {
  useCreateReviewMutation,
  useGetReviewByCourseIdQuery,
} from "@/redux/api/reviewApi";
import { CheckCircle, ChevronDown, Play, Star, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface Video {
  id: string;
  title: string;
  url: string;
  order: number;
  duration: number;
  videoResources: {
    id: string;
    title: string;
    url: string;
    order: number;
  }[];
}

interface Module {
  id: string;
  title: string;
  order: number;
  videos: Video[];
}

interface ProgressData {
  userId: string;
  videoId: string;
  enrollmentId: string;
  progress: number;
  isCompleted: boolean;
}

export default function CourseDetailsPage() {
  const { data: userAllData, refetch: refetchUser } = useGetMeQuery({});
  const { id } = useParams();
  const { data: courseData, isLoading } = useGetCourseByIdQuery(id);
  const { data: reviewData, refetch: reviewRefetch } =
    useGetReviewByCourseIdQuery(courseData?.data?.id);
  const [createProgress] = useCreateProgressMutation();
  const [
    createReviewFN,
    { isLoading: isSubmittingReview, reset: resetCreateReview },
  ] = useCreateReviewMutation();
  // const { data: userData, refetch: refetchUserData } = useGetUserByIdQuery(
  //   userAllData?.data?.id,
  //   { skip: !userAllData?.data?.id }
  // );

  const videoRef = useRef<HTMLVideoElement>(null);

  // Find user's enrollment for this course
  const userEnrollment = courseData?.data?.enrollments?.find(
    (enrollment: any) => enrollment.userId === userAllData?.data?.id
  );

  // Get progress data by enrollment ID
  const { data: progressData, refetch: refetchProgress } =
    useGetProgressByIdQuery(userEnrollment?.id, {
      skip: !userEnrollment?.id,
    });

  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isTrackingProgress, setIsTrackingProgress] = useState(false);
  const [completedVideos, setCompletedVideos] = useState<Set<string>>(
    new Set()
  );

  // Review states
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Initialize expanded modules and completed videos when data loads
  useEffect(() => {
    if (courseData?.data?.modules) {
      // Initialize expanded modules
      setExpandedModules((prev) => {
        if (prev.size > 0) return prev;
        return new Set(courseData.data.modules.map((m: Module) => m.id));
      });
    }

    // Initialize completed videos
    if (userAllData?.data?.progress) {
      const completed = new Set<string>();
      userAllData.data.progress.forEach((progress: any) => {
        if (progress.isCompleted) {
          completed.add(progress.videoId);
        }
      });
      setCompletedVideos(completed);
    }
  }, [courseData?.data?.modules, userAllData?.data?.progress]);

  // Check if user has already completed the video
  const hasCompletedVideo = (videoId: string) => {
    return completedVideos.has(videoId);
  };

  const handlePlayVideo = (video: Video) => {
    setCurrentVideo(video);
    setIsVideoPlayerOpen(true);
    setVideoProgress(0);
    setIsTrackingProgress(true);
  };

  const handleCloseVideo = () => {
    setIsVideoPlayerOpen(false);
    setCurrentVideo(null);
    setIsTrackingProgress(false);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current || !currentVideo) return;
    const video = videoRef.current;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(progress);

    // If video is almost complete (95% or more), mark as completed
    if (progress >= 95 && !hasCompletedVideo(currentVideo.id)) {
      handleVideoCompletion();
    }
  };

  const handleVideoCompletion = async () => {
    if (!currentVideo || !userEnrollment || !userAllData?.data?.id) return;

    const progressData: ProgressData = {
      userId: userAllData.data.id,
      videoId: currentVideo.id,
      enrollmentId: userEnrollment.id,
      progress: 100,
      isCompleted: true,
    };

    try {
      await createProgress(progressData).unwrap();
      console.log("Progress saved successfully");

      // Update local state immediately
      setCompletedVideos((prev) => {
        const newSet = new Set(prev);
        newSet.add(currentVideo.id);
        return newSet;
      });

      // Refetch data to ensure consistency
      refetchUser();
      refetchProgress();
    } catch (error) {
      console.error("Failed to save progress:", error);
    } finally {
      setIsTrackingProgress(false);
    }
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReview = async () => {
    try {

      //check course status is upcoming then return
      if (courseData?.data?.status === "UPCOMING") {
        toast.error("You can't submit a review for an upcoming course.");
        return;
      }
      // Check if user has watched at least 80% of the course
      if (progressData?.data?.overallProgress < 80) {
        toast.error(
          "You must watch at least 80% of the course to submit a review."
        );
        return;
      }

      // Validate inputs
      if (rating === 0) {
        toast.error("Please select a rating before submitting your review.");
        return;
      }

      if (reviewComment.trim() === "") {
        toast.error("Please write a review comment before submitting.");
        return;
      }

      // Prepare review data
      const reviewData = {
        courseId: courseData?.data?.id,
        userId: userAllData?.data?.id,
        comment: reviewComment.trim(),
        rating: rating,
      };

      // Reset form immediately for better UX
      setReviewSubmitted(false);

      // Submit review
      const response = await createReviewFN(reviewData);

      // Handle success case
      if (response && !response.error) {
        toast.success("Review submitted successfully!");
        reviewRefetch();
        setRating(0);
        setReviewComment("");
        return;
      }

      // Handle error case
      if (response?.error) {
        let errorMessage = "Failed to submit review";
        if (
          "data" in response.error &&
          response.error.data &&
          typeof response.error.data === "object" &&
          "message" in response.error.data
        ) {
          errorMessage =
            (response.error.data as { message?: string }).message ||
            errorMessage;
        } else if ("message" in response.error && response.error.message) {
          errorMessage = response.error.message as string;
        }
        toast.error(errorMessage);
        resetCreateReview();
        return;
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An unexpected error occurred while submitting your review");
    } finally {
      setReviewSubmitted(false);
    }
  };

  const VideoCard = ({ video }: { video: Video }) => {
    const isCompleted = hasCompletedVideo(video.id);

    return (
      <div className="flex gap-4 items-center">
        <div
          className="relative w-48 h-28 rounded-lg overflow-hidden bg-gray-900 cursor-pointer"
          onClick={() => handlePlayVideo(video)}
        >
          <Image
            src={courseData?.data?.thumnail || "/placeholder.svg"}
            alt="Video thumbnail"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 text-white text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
            {courseData?.data?.title}
          </div>
          {isCompleted && (
            <div className="absolute top-2 right-2 bg-text-secondary text-white text-xs px-2 py-1 rounded-full">
              <CheckCircle color="white" className="w-4 h-4" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="text-xs text-green-600 font-medium mb-1">
            Video {video.order}
          </p>
          <h3 className="text-base font-medium text-gray-800 mb-3">
            {video.title}
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => handlePlayVideo(video)}
              className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              Play Video
            </button>
            {video.videoResources.length > 0 && (
              <a
                href={video.videoResources[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
              >
                Resources
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!courseData?.data) {
    return (
      <div className="min-h-screen bg-white p-6 flex items-center justify-center">
        <p className="text-gray-600">Course not found</p>
      </div>
    );
  }

  const course = courseData.data;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto rounded-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Course Details
        </h1>

        {/* Progress Summary Section */}
        {progressData?.data && (
          <div className="mb-8 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-1">
              Your Progress
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 flex flex-col space-y-4 items-center rounded-lg shadow-sm border border-gray-100">
                <p className="text-lg font-semibold text-gray-900">
                  Total Videos
                </p>
                <p className="text-4xl font-bold text-gray-800">
                  {progressData.data.totalVideos}
                </p>
              </div>
              <div className="bg-white p-4 flex flex-col space-y-4 items-center rounded-lg shadow-sm border border-gray-100">
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  Completed
                </p>
                <p className="text-4xl font-bold text-green-600 flex items-center">
                  {progressData.data.completedVideos}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <CircularProgress
                  progress={progressData.data.overallProgress}
                />
              </div>
              {/* <div className="bg-white p-4 flex flex-col justify-center items-center rounded-lg shadow-sm border border-gray-100">
                <p className="text-lg font-semibold text-gray-900">Progress</p>
                <p className="text-4xl font-bold text-blue-600">
                  {progressData.data.overallProgress}%
                </p>
              </div> */}
            </div>
            {progressData.data.lastWatched && (
              <p className="text-xs text-gray-500 mt-4">
                Last watched:{" "}
                {new Date(progressData.data.lastWatched).toLocaleString()}
              </p>
            )}
          </div>
        )}

        {/* Course Info Section */}
        <div className="mb-8">
          <div className="mb-4">
            <p className="text-base text-gray-600 mb-1">Course name:</p>
            <p className="text-lg font-medium text-gray-800">{course.title}</p>
          </div>
          <div className="mb-6">
            <p className="text-base text-gray-600 mb-1">Description:</p>
            <p className="text-lg font-medium text-gray-800">
              {course.description}
            </p>
          </div>
          {userEnrollment && (
            <div className="mb-6">
              <p className="text-base text-gray-600 mb-1">Enrollment Date:</p>
              <p className="text-lg font-medium text-gray-800">
                {new Date(userEnrollment.enrolledAt).toLocaleDateString()}
              </p>
            </div>
          )}
          <div className="flex gap-12 mb-6">
            <div>
              <p className="text-base text-gray-600 mb-1">Course modules:</p>
              <p className="text-lg font-semibold text-gray-800">
                {course.modules.length}
              </p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1">Total Classes:</p>
              <p className="text-lg font-semibold text-gray-800">
                {course.classes}
              </p>
            </div>
            <div>
              <p className="text-base text-gray-600 mb-1">Course Level:</p>
              <p className="text-lg font-semibold text-gray-800">
                {course.level}
              </p>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(reviewData?.data?.averageRating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {reviewData?.data?.averageRating?.toFixed(1) || "0.0"} (
                {reviewData?.data?.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          {/* Interactive Star Rating */}
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 hover:text-yellow-200"
                }`}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
              />
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-gray-600">
                {rating} star{rating !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Review Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Write a review about this course..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {reviewComment.length}/500 characters
                </div>
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmittingReview || reviewSubmitted}
                  className={`px-6 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                    reviewSubmitted
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : isSubmittingReview
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {reviewSubmitted
                    ? "✓ Review Submitted!"
                    : isSubmittingReview
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
              </div>
            </div>

            {/* Review Preview */}
            {(rating > 0 || reviewComment.trim()) && !reviewSubmitted && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Review Preview:
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({rating}/5)</span>
                </div>
                <p className="text-sm text-gray-700">
                  {reviewComment.trim() || "No comment provided"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Modules */}
        {[...course.modules]
          .sort((a: Module, b: Module) => a.order - b.order)
          .map((module: Module) => (
            <div key={module.id} className="mb-8">
              <div
                className="flex items-center justify-between cursor-pointer mb-6 group"
                onClick={() => toggleModule(module.id)}
              >
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
                  {module.title}
                </h2>
                <ChevronDown
                  className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${
                    expandedModules.has(module.id) ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedModules.has(module.id)
                    ? "max-h-[2000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="space-y-4">
                  {[...module.videos]
                    .sort((a: Video, b: Video) => a.order - b.order)
                    .map((video: Video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Video Player Modal */}
      {isVideoPlayerOpen && currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Video Player */}
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                src={currentVideo.url}
                controlsList="nodownload"
                controls
                autoPlay
                className="w-full h-full"
                poster={course.thumnail}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoCompletion}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            {/* Video Info */}
            <div className="p-4 bg-gray-900 text-white">
              <p className="text-sm text-green-400 mb-1">
                Video {currentVideo.order}
              </p>
              <h3 className="text-lg font-medium">{currentVideo.title}</h3>
              {isTrackingProgress && (
                <div className="mt-2">
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">
                    Progress: {Math.round(videoProgress)}%
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
