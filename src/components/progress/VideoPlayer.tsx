// // components/VideoPlayer.tsx
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Download, X } from "lucide-react";
// import { useUpdateProgressMutation } from "@/redux/api/progressApi";
// import { Course, Video } from "./types";


// interface VideoPlayerProps {
//   video: Video;
//   course: Course;
//   onClose: () => void;
//   onProgressUpdate: () => void;
// }

// export default function VideoPlayer({
//   video,
//   course,
//   onClose,
//   onProgressUpdate,
// }: VideoPlayerProps) {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const progressUpdateTimeout = useRef<NodeJS.Timeout>();
//   const [updateProgress] = useUpdateProgressMutation();
//   const [currentProgress, setCurrentProgress] = useState<number>(0);
//   const [isInitialSeekDone, setIsInitialSeekDone] = useState(false);

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     if (!videoElement) return;

//     const handleTimeUpdate = () => {
//       if (!videoElement.duration || isNaN(videoElement.duration)) return;

//       const progress = (videoElement.currentTime / videoElement.duration) * 100;
//       setCurrentProgress(progress);

//       // Debounce progress updates to avoid excessive API calls
//       if (progressUpdateTimeout.current) {
//         clearTimeout(progressUpdateTimeout.current);
//       }

//       progressUpdateTimeout.current = setTimeout(async () => {
//         const roundedProgress = Math.round(progress);
//         const isCompleted = progress >= 95;

//         try {
//           await updateProgress({
//             videoId: video.id,
//             courseId: course.id,
//             progress: roundedProgress,
//             isCompleted,
//           }).unwrap();

//           onProgressUpdate();
//         } catch (error) {
//           console.error("Failed to update progress:", error);
//         }
//       }, 2000); // Update every 2 seconds
//     };

//     const handleLoadedMetadata = () => {
//       // This would ideally get the saved progress from props or API
//       // For now, we'll start from the beginning
//       setIsInitialSeekDone(true);
//     };

//     const handleVideoEnd = async () => {
//       try {
//         await updateProgress({
//           videoId: video.id,
//           courseId: course.id,
//           progress: 100,
//           isCompleted: true,
//         }).unwrap();

//         setCurrentProgress(100);
//         onProgressUpdate();
//       } catch (error) {
//         console.error("Failed to update completion:", error);
//       }
//     };

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     videoElement.addEventListener("timeupdate", handleTimeUpdate);
//     videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
//     videoElement.addEventListener("ended", handleVideoEnd);
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       videoElement.removeEventListener("timeupdate", handleTimeUpdate);
//       videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
//       videoElement.removeEventListener("ended", handleVideoEnd);
//       document.removeEventListener("keydown", handleKeyDown);

//       if (progressUpdateTimeout.current) {
//         clearTimeout(progressUpdateTimeout.current);
//       }
//     };
//   }, [video.id, course.id, updateProgress, onProgressUpdate, onClose]);

//   const formatTime = (seconds?: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00";
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
//       <div className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-75 transition-all"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         {/* Video Container */}
//         <div className="relative aspect-video">
//           <video
//             ref={videoRef}
//             key={video.id}
//             controls
//             autoPlay
//             className="w-full h-full"
//             poster={course.thumnail || undefined}
//             onError={(e) =>
//               console.error("Video error:", e.currentTarget.error)
//             }
//           >
//             <source src={video.url} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </div>

//         {/* Video Info */}
//         <div className="p-6 bg-gray-900 text-white">
//           <div className="flex items-center justify-between mb-2">
//             <div>
//               <p className="text-sm text-green-400 mb-1">Video {video.order}</p>
//               <h3 className="text-xl font-semibold">{video.title}</h3>
//             </div>
//             <div className="text-right">
//               <div className="text-sm text-gray-400">
//                 {formatTime(videoRef.current?.currentTime)} /{" "}
//                 {formatTime(videoRef.current?.duration)}
//               </div>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="mt-4">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-400">Progress</span>
//               <span className="text-sm font-medium text-green-400">
//                 {Math.round(currentProgress)}%
//               </span>
//             </div>
//             <div className="w-full bg-gray-700 rounded-full h-2">
//               <div
//                 className="bg-green-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${currentProgress}%` }}
//               />
//             </div>
//           </div>

//           {/* Video Resources */}
//           {video.videoResources && video.videoResources.length > 0 && (
//             <div className="mt-4 pt-4 border-t border-gray-700">
//               <h4 className="text-sm font-medium text-gray-300 mb-2">
//                 Resources ({video.videoResources.length})
//               </h4>
//               <div className="flex gap-2 flex-wrap">
//                 {video.videoResources.map((resource) => (
//                   <a
//                     key={resource.id}
//                     href={resource.url}
//                     download
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg hover:bg-gray-700 transition-colors"
//                   >
//                     <Download className="w-3 h-3 mr-1" />
//                     {resource.title}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
