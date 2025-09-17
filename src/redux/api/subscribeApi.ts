// src/redux/api/contactApi.ts
import { baseApi } from "./baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscribe: builder.mutation({
      query: (body) => ({
        url: "/subscription",
        method: "POST",
        body,
      }),
    }),
      confirmSubscribe: builder.mutation({
      query: (body) => ({
        url: '/subscription/confirm',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Subscribe'],
    }),
    getSubscribe: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["Subscribe"],
    }),
    deleteSubscribe: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
      }),
    }),
    sendWelcomeEmail: builder.mutation({
      query: (body) => ({
        url: "/email/success",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscribe"],
    }),
    sendBroadcastEmail: builder.mutation({
      query: (formData) => ({
        url: "/email/broadcast",
        method: "POST",
        body: formData,
        // Don't set Content-Type header - the browser will set it automatically
        // with the correct boundary for FormData
      }),
    }),

    getAgreedSubscribe: builder.query({
      query: () => ({
        url: "/subscription/agreed",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["Subscribe"],
    }),
  }),
});

export const { 
    useCreateSubscribeMutation,
    useConfirmSubscribeMutation,
    useGetSubscribeQuery,
    useDeleteSubscribeMutation,
    useSendWelcomeEmailMutation,
    useSendBroadcastEmailMutation,
    useGetAgreedSubscribeQuery,
 } = subscribeApi;
