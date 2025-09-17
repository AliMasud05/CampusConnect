// "use client";

// import { CheckCircle, Clock, PlayCircle, Trophy } from "lucide-react";
// import { CourseProgressResponse } from "./types";

// interface ProgressDashboardProps {
//   progress: CourseProgressResponse | undefined;
//   courseId: string;
// }

// export default function ProgressDashboard({
//   progress,
//   courseId,
// }: ProgressDashboardProps) {
//   const overallProgress = progress?.overallProgress || 0;
//   const completedVideos = progress?.completedVideos || 0;
//   const totalVideos = progress?.totalVideos || 0;
//   const lastWatched = progress?.lastWatched;

//   const getProgressColor = (percentage: number) => {
//     if (percentage >= 90) return "text-green-600 bg-green-50";
//     if (percentage >= 70) return "text-blue-600 bg-blue-50";
//     if (percentage >= 50) return "text-yellow-600 bg-yellow-50";
//     return "text-gray-600 bg-gray-50";
//   };

//   const getProgressBarColor = (percentage: number) => {
//     if (percentage >= 90) return "bg-green-500";
//     if (percentage >= 70) return "bg-blue-500";
//     if (percentage >= 50) return "bg-yellow-500";
//     return "bg-gray-400";
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-xl font-semibold text-gray-900">
//           📊 Your Progress
//         </h2>
//         {lastWatched && (
//           <div className="text-sm text-gray-500">
//             Last watched: {new Date(lastWatched).toLocaleDateString()}
//           </div>
//         )}
//       </div>

//       {/* Main Progress Bar */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium text-gray-700">
//             Overall Progress
//           </span>
//           <span className="text-sm font-bold text-gray-900">
//             {overallProgress}%
//           </span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-3">
//           <div
//             className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(
//               overallProgress
//             )}`}
//             style={{ width: `${overallProgress}%` }}
//           />
//         </div>
//       </div>

//       {/* Progress Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {/* Completion Rate */}
//         <div className={`p-4 rounded-lg ${getProgressColor(overallProgress)}`}>
//           <div className="flex items-center gap-2 mb-2">
//             <Trophy className="w-5 h-5" />
//             <span className="text-sm font-medium">Completion</span>
//           </div>
//           <div className="text-2xl font-bold">{overallProgress}%</div>
//         </div>

//         {/* Videos Completed */}
//         <div className="p-4 rounded-lg bg-green-50 text-green-600">
//           <div className="flex items-center gap-2 mb-2">
//             <CheckCircle className="w-5 h-5" />
//             <span className="text-sm font-medium">Completed</span>
//           </div>
//           <div className="text-2xl font-bold">
//             {completedVideos}/{totalVideos}
//           </div>
//         </div>

//         {/* Videos Remaining */}
//         <div className="p-4 rounded-lg bg-orange-50 text-orange-600">
//           <div className="flex items-center gap-2 mb-2">
//             <PlayCircle className="w-5 h-5" />
//             <span className="text-sm font-medium">Remaining</span>
//           </div>
//           <div className="text-2xl font-bold">
//             {totalVideos - completedVideos}
//           </div>
//         </div>

//         {/* Time Spent */}
//         <div className="p-4 rounded-lg bg-blue-50 text-blue-600">
//           <div className="flex items-center gap-2 mb-2">
//             <Clock className="w-5 h-5" />
//             <span className="text-sm font-medium">Status</span>
//           </div>
//           <div className="text-sm font-bold">
//             {overallProgress === 100 ? "Complete!" : "In Progress"}
//           </div>
//         </div>
//       </div>

//       {/* Motivational Message */}
//       {overallProgress > 0 && overallProgress < 100 && (
//         <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
//           <div className="flex items-center gap-2 text-green-700">
//             <span className="text-lg">🎯</span>
//             <span className="font-medium">
//               {overallProgress >= 80
//                 ? "You're almost there! Keep going!"
//                 : overallProgress >= 50
//                 ? "Great progress! You're halfway through!"
//                 : "You've started your learning journey. Keep it up!"}
//             </span>
//           </div>
//         </div>
//       )}

//       {/* Completion Celebration */}
//       {overallProgress === 100 && (
//         <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border border-green-200">
//           <div className="flex items-center gap-2 text-green-700">
//             <span className="text-lg">🎉</span>
//             <span className="font-medium">
//               Congratulations! You've completed the entire course!
//             </span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
