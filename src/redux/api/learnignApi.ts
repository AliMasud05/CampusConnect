import { baseApi } from "./baseApi";


const learningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLearningData: builder.mutation({
      query: (data) => ({
        url: "/learning-data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LearningData"],
    }),
    getAllLearningData: builder.query({
      query: () => ({
        url: "/learning-data",
        method: "GET",
      }),
      providesTags: ["LearningData"],
    }),
    //update learning data
    updateLearningData: builder.mutation({
      query: (
        { id, data }
      ) => ({
        url: `/learning-data/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["LearningData"],
    }),

    //delete learning data
    deleteLearningData: builder.mutation({
      query: (id) => ({
        url: `/learning-data/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LearningData"],
    }),
  
  }),
});

export const {
    useCreateLearningDataMutation,
    useGetAllLearningDataQuery,
    useUpdateLearningDataMutation,
    useDeleteLearningDataMutation,
 
} = learningApi;
