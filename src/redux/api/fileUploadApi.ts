import { baseApi } from "./baseApi";

const fileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    singleFileUpload: builder.mutation({
      query: (data) => ({
        url: "/files/single",
        method: "POST",
        body: data,
      }),
    }),

    multipleFileUpload: builder.mutation({
      query: (data) => ({
        url: "/files/multiple",
        method: "POST",
        body: data,
      }),
    }),

    deleteSingleFile: builder.mutation({
      query: (data) => ({
        url: `/files/single/${data}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useSingleFileUploadMutation, useMultipleFileUploadMutation, useDeleteSingleFileMutation } = fileApi;
