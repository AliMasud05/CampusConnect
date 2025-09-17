import { baseApi } from "./baseApi";

const resourceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createResource: builder.mutation({
      query: (data) => ({
        url: "/resources",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Resource"],
    }),
    getAllResources: builder.query({
      query: () => ({
        url: "/resources",
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getResourceById: builder.query({
      query: (id) => ({
        url: `/resources/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Resource", id }],
    }),
    getResourcesByCourseId: builder.query({
      query: (courseId) => ({
        url: `/resources/course/${courseId}`,
        method: "GET",
      }),
      providesTags:["Resource", "Course"],
    }),
    getResourcesByType: builder.query({
      query: (type) => ({
        url: `/resources/type/${type}`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    getResourcesByStatus: builder.query({
      query: (status) => ({
        url: `/resources/status/${status}`,
        method: "GET",
      }),
      providesTags: ["Resource"],
    }),
    updateResource: builder.mutation({
      query: ({ id, data }) => ({
        url: `/resources/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Resource", id },
        "Resource",
      ],
    }),
    deleteResource: builder.mutation({
      query: (id) => ({
        url: `/resources/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Resource"],
    }),
  }),
});

export const {
  useCreateResourceMutation,
  useGetResourceByIdQuery,
  useGetAllResourcesQuery,
  useGetResourcesByCourseIdQuery,
  useGetResourcesByTypeQuery,
  useGetResourcesByStatusQuery,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
} = resourceApi;
