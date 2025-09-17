// src/redux/api/contactApi.ts
import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createContact: builder.mutation({
      query: (body) => ({
        url: "/contacts",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
