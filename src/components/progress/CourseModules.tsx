// // components/CourseModules.tsx
// "use client";

// import { useState } from "react";
// import { ChevronDown, CheckCircle, Play, Download } from "lucide-react";
// import { Module, Video, CourseProgressResponse } from "./types";

// interface CourseModulesProps {
//   modules: Module[];
//   progress: CourseProgressResponse | undefined;
//   onPlayVideo: (video: Video) => void;
// }

// export default function CourseModules({
//   modules,
//   progress,
//   onPlayVideo,
// }: CourseModulesProps) {
//   const [expandedModules, setExpandedModules] = useState<Set<string>>(
//     new Set(modules.map((m) => m.id))
//   );

//   const toggleModule = (moduleId: string) => {
//     setExpandedModules((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(moduleId)) {
//         newSet.delete(moduleId);
//       } else {
//         newSet.add(moduleId);
//       }
//       return newSet;
//     });
//   };

//   const getVideoProgress = (videoId: string) => {
//     const moduleProgress = progress?.moduleProgress;
//     if (!moduleProgress) return { progress: 0, isCompleted: false };

//     for (const module of moduleProgress) {
//       const video = module.videos.find((v) => v.id === videoId);
//       if (video) {
//         return {
//           progress: video.progress,
//           isCompleted: video.isCompleted,
//           lastWatched: video.lastWatched,
//         };
//       }
//     }
//     return { progress: 0, isCompleted: false };
//   };

//   const getModuleStats = (moduleId: string) => {
//     const moduleProgress = progress?.moduleProgress?.find(
//       (m) => m.moduleId === moduleId
//     );
//     return {
//       completed: moduleProgress?.completed || 0,
//       total: moduleProgress?.total || 0,
//       progress: moduleProgress?.progress || 0,
//     };
//   };

//   if (!modules || modules.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
//         <div className="text-gray-400 text-6xl mb-4">📚</div>
//         <h3 className="text-lg font-medium text-gray-900 mb-2">
//           No modules available
//         </h3>
//         <p className="text-gray-600">
//           This course doesn't have any modules yet.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {modules.map((module) => {
//         const stats = getModuleStats(module.id);
//         const isExpanded = expandedModules.has(module.id);

//         return (
//           <div
//             key={module.id}
//             className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
//           >
//             {/* Module Header */}
//             <div
//               className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
//               onClick={() => toggleModule(module.id)}
//             >
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <ChevronDown
//                       className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
//                         isExpanded ? "rotate-0" : "-rotate-90"
//                       }`}
//                     />
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {module.title}
//                     </h3>
//                   </div>

//                   {/* Module Progress Badge */}
//                   <div className="flex items-center gap-2">
//                     <div className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
//                       {stats.completed}/{stats.total} completed
//                     </div>
//                     {stats.progress === 100 && (
//                       <CheckCircle className="w-5 h-5 text-green-500" />
//                     )}
//                   </div>
//                 </div>

//                 {/* Module Progress Bar */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-24 bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-green-500 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${stats.progress}%` }}
//                     />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700 min-w-[3rem]">
//                     {stats.progress}%
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Module Content */}
//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 isExpanded ? "max-h-none" : "max-h-0"
//               }`}
//             >
//               <div className="border-t border-gray-200 bg-gray-50">
//                 <div className="p-4 space-y-3">
//                   {module.videos.map((video) => (
//                     <VideoCard
//                       key={video.id}
//                       video={video}
//                       progress={getVideoProgress(video.id)}
//                       onPlayVideo={onPlayVideo}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// interface VideoCardProps {
//   video: Video;
//   progress: {
//     progress: number;
//     isCompleted: boolean;
//     lastWatched?: string;
//   };
//   onPlayVideo: (video: Video) => void;
// }

// function VideoCard({ video, progress, onPlayVideo }: VideoCardProps) {
//   const formatTime = (seconds?: number) => {
//     if (!seconds || isNaN(seconds)) return "0:00";
//     const minutes = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${minutes}:${secs.toString().padStart(2, "0")}`;
//   };

//   return (
//     <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//       <div className="flex gap-4 items-center">
//         {/* Video Thumbnail */}
//         <div className="relative flex-shrink-0">
//           <div
//             className="w-40 h-24 rounded-lg overflow-hidden bg-gray-900 cursor-pointer group"
//             onClick={() => onPlayVideo(video)}
//           >
//             <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
//               <div className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center group-hover:bg-opacity-70 transition-all">
//                 <Play className="w-5 h-5 text-white ml-1" />
//               </div>
//             </div>

//             {/* Progress Bar */}
//             <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
//               <div
//                 className="h-full bg-green-500 transition-all duration-300"
//                 style={{ width: `${progress.progress}%` }}
//               />
//             </div>
//           </div>

//           {/* Completion Badge */}
//           {progress.isCompleted && (
//             <div className="absolute -top-2 -right-2">
//               <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
//             </div>
//           )}
//         </div>

//         {/* Video Info */}
//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-1">
//             <span className="text-xs text-green-600 font-medium">
//               Video {video.order}
//             </span>
//             {video.duration && (
//               <span className="text-xs text-gray-500">
//                 • {formatTime(video.duration)}
//               </span>
//             )}
//           </div>

//           <h4 className="text-base font-medium text-gray-900 mb-2">
//             {video.title}
//           </h4>

//           <div className="flex items-center gap-2 mb-3">
//             <div className="flex-1 bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-green-500 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${progress.progress}%` }}
//               />
//             </div>
//             <span className="text-xs text-gray-600 font-medium">
//               {progress.progress}%
//             </span>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => onPlayVideo(video)}
//               className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
//             >
//               {progress.progress > 0 ? "Continue" : "Start"} Video
//             </button>

//             {video.videoResources?.length > 0 && (
//               <div className="relative group">
//                 <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
//                   Resources ({video.videoResources.length})
//                 </button>
//                 <div className="absolute left-0 top-full mt-1 w-64 bg-white shadow-lg rounded-lg py-2 z-10 hidden group-hover:block border border-gray-200">
//                   {video.videoResources.map((resource) => (
//                     <a
//                       key={resource.id}
//                       href={resource.url}
//                       download
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       {resource.title}
//                     </a>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {progress.lastWatched && (
//             <div className="text-xs text-gray-500 mt-2">
//               Last watched:{" "}
//               {new Date(progress.lastWatched).toLocaleDateString()}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
