export type TCourseReview = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  courseId: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  course: {
    id: string;
    title: string;
  };
};
