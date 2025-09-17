import { baseApi } from "@/redux/api/baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Course Endpoints
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    updateCourse: builder.mutation({
      query: (data) => ({
        url: "/course",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getCourses: builder.query({
      query: () => ({
        url: "/course",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    //get all public courses
    getPublicCourses: builder.query({
      query: () => ({
        url: "/course/all-public-courses",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    getCourseById: builder.query({
      query: (id) => ({
        url: `/course/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    updateCourseById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/course/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteCourseById: builder.mutation({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    // Module Endpoints
    createModule: builder.mutation({
      query: (data) => ({
        url: "/module",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getModules: builder.query({
      query: () => ({
        url: "/module",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    deleteModule: builder.mutation({
      query: (id) => ({
        url: `/module/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    updateModule: builder.mutation({
      query: ({ id, data }) => ({
        url: `/module/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getModule: builder.query({
      query: (id) => ({
        url: `/module/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // Video Endpoints
    createVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getVideos: builder.query({
      query: () => ({
        url: "/videos",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    updateVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    // Video Resource Endpoints
    createVideoResource: builder.mutation({
      query: (data) => ({
        url: "/video-resources",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getVideoResources: builder.query({
      query: () => ({
        url: "/video-resources",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),

    deleteVideoResource: builder.mutation({
      query: (id) => ({
        url: `/video-resources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),

    updateVideoResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `/video-resources/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    getVideoResource: builder.query({
      query: (id) => ({
        url: `/video-resources/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
  }),
});

export const {
  // Course Hooks
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCoursesQuery,
  useGetPublicCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseByIdMutation,
  useDeleteCourseByIdMutation,

  // Module Hooks
  useCreateModuleMutation,
  useGetModulesQuery,
  useDeleteModuleMutation,
  useUpdateModuleMutation,
  useGetModuleQuery,

  // Video Hooks
  useCreateVideoMutation,
  useGetVideosQuery,
  useDeleteVideoMutation,
  useUpdateVideoMutation,
  useGetVideoQuery,

  // Video Resource Hooks
  useCreateVideoResourceMutation,
  useGetVideoResourcesQuery,
  useDeleteVideoResourceMutation,
  useUpdateVideoResourceMutation,
  useGetVideoResourceQuery,
} = courseApi;
