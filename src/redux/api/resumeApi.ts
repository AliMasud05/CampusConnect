import { baseApi } from "./baseApi";

const resumeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentResume: builder.query({
      query: () => ({
        url: "/resume/recent",
        method: "GET",
      }),
      providesTags: ["Resume"],
    }),
    uploadResume: builder.mutation({
      query: (data) => ({
        url: "/resume",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Resume"],     
    }),
  }),
});

export const { 
     useGetRecentResumeQuery,
     useUploadResumeMutation
 } = resumeApi;
