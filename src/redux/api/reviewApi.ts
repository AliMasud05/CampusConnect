
import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: "/reviews",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),
    //get review by course id
    getReviewByCourseId: builder.query({
      query: (courseId) => ({
        url: `/reviews/course/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useGetReviewByCourseIdQuery,
} = reviewApi;
