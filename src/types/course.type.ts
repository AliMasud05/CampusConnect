export type TCourse = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  courseType: string;
  level: string;
  duration: number;
  language: string;
  classes: string;
  description: string;
  demoVideo: string;
  thumnail: string;
  status: string;
  releaseDate: string | null;
  createdAt: string;
  updatedAt: string;
  modules: TModule[];
  enrollments: TEnrollment[];
  reviews: TReview[];
  discount: number;
  discountedPrice: number;
}

export type TModule = {
  id: string;
  title: string;
  order: number;
  courseId: string;
  createdAt: string;
  videos: TVideo[];
}

export type TVideo = {
  id: string;
  title: string;
  url: string;
  order: number;
  moduleId: string;
  createdAt: string;
  videoResources: TVideoResource[];
}

export type TVideoResource = {
  id: string;
  title: string;
  url: string;
  order: number;
  videoId: string;
  createdAt: string;
}

export type TEnrollment = {
  id: string;
  userId: string;
  courseId: string;
  Amount: number;
  paymentStatus: string;
  enrolledAt: string;
}

export type TReview = {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  courseId: string;
  createdAt: string;
}
