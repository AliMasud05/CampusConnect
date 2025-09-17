// // components/CourseHeader.tsx
// "use client";

// import Image from "next/image";
// import { Course } from "./types";

// interface CourseHeaderProps {
//   course: Course;
// }

// export default function CourseHeader({ course }: CourseHeaderProps) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//       <div className="flex gap-6">
//         {/* Course Thumbnail */}
//         <div className="flex-shrink-0">
//           <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-200">
//             {course.thumnail ? (
//               <Image
//                 src={course.thumnail}
//                 alt={course.title}
//                 width={128}
//                 height={128}
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
//                 <span className="text-white text-2xl font-bold">
//                   {course.title.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Course Info */}
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {course.title}
//           </h1>

//           <p className="text-gray-600 mb-4 leading-relaxed">
//             {course.description}
//           </p>

//           <div className="flex items-center gap-4 text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               📚 {course.modules?.length || 0} modules
//             </span>
//             <span className="flex items-center gap-1">
//               🎥{" "}
//               {course.modules?.reduce(
//                 (total, module) => total + (module.videos?.length || 0),
//                 0
//               ) || 0}{" "}
//               videos
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
