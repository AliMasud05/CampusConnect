// types/index.ts
export interface Course {
  id: string;
  title: string;
  subtitle: string;
  status: "ONGOING" | "UPCOMING";
  releaseDate: string | null;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  Amount: number;
  paymentStatus: string;
  enrolledAt: string;
  course: Course;
}

export type EnrollmentWithCourse = Enrollment;
