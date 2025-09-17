import { baseApi } from "./baseApi";

const progressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProgress: builder.mutation({
      query: (data) => ({
        url: "/progress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Progress"],
    }),
    getProgress: builder.query({
      query: () => ({
        url: "/progress",
        method: "GET",
      }),
      providesTags: ["Progress"],
    }),
    getProgressById: builder.query({
      query: (id) => ({
        url: `/progress/my-course-summary/${id}`,
        method: "GET",
      }),
      providesTags: ["Progress"],
    }),
    updateProgress: builder.mutation({
      query: (data) => ({
        url: "/progress",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Progress"],
    }),
    deleteProgress: builder.mutation({
      query: (id) => ({
        url: `/progress/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Progress"],
    }),
  }),
});

export const {
    useCreateProgressMutation,
    useGetProgressQuery,
    useUpdateProgressMutation,
    useDeleteProgressMutation,
    useGetProgressByIdQuery,

} = progressApi;
