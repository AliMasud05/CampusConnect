// // types.ts
// export interface VideoResource {
//   id: string;
//   title: string;
//   url: string;
//   order: number;
//   videoId: string;
//   createdAt: string;
// }

// export interface Video {
//   id: string;
//   title: string;
//   url: string;
//   order: number;
//   moduleId: string;
//   createdAt: string;
//   videoResources: VideoResource[];
//   duration?: number;
// }

// export interface Module {
//   id: string;
//   title: string;
//   order: number;
//   courseId: string;
//   createdAt: string;
//   videos: Video[];
// }

// export interface Course {
//   id: string;
//   title: string;
//   description: string;
//   thumnail?: string;
//   modules: Module[];
// }

// export interface ProgressData {
//   videoId: string;
//   progress: number;
//   isCompleted: boolean;
//   lastWatched?: Date;
// }

// export interface CourseProgressResponse {
//   enrollmentId: string;
//   courseId: string;
//   courseName: string;
//   overallProgress: number;
//   completedVideos: number;
//   totalVideos: number;
//   moduleProgress: Array<{
//     moduleId: string;
//     moduleName: string;
//     completed: number;
//     total: number;
//     progress: number;
//     videos: Array<{
//       id: string;
//       title: string;
//       duration?: number;
//       order: number;
//       progress: number;
//       isCompleted: boolean;
//       lastWatched?: string | null;
//     }>;
//   }>;
//   recentProgress: any[];
//   lastWatched?: string | null;
// }
