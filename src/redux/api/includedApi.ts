import { baseApi } from "./baseApi";


const includedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllIncluded: builder.query({
      query: () => ({
        url: "/included",
        method: "GET",
      }),
      providesTags: ["Included"],
    }),

    //get included by resource id
    getIncludedByResourceId: builder.query({
      query: (id) => ({
        url: `/included/resource/${id}`,
        method: "GET",
      }),
      providesTags: ["Included"],
    }),
    createIncluded: builder.mutation({
      query: (data) => ({
        url: "/included",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Included"],
    }),
    //update included
    updateIncluded: builder.mutation({
      query: (
        { id, data }
      ) => ({
        url: `/included/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Included"],
    }),
    deleteIncluded: builder.mutation({
      query: (id) => ({
        url: `/included/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Included"],
    }),

   
  
  }),
});

export const {
    useGetAllIncludedQuery,
    useGetIncludedByResourceIdQuery,
    useCreateIncludedMutation,
    useUpdateIncludedMutation,
    useDeleteIncludedMutation,

 
} = includedApi;
