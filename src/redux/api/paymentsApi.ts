// ========================= UPDATED REDUX API =========================
// redux/api/paymentsApi.ts

import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    stripePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/stripe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
    stripeResourcePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/resource-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
    cashPayment: builder.mutation({
      query: (data) => ({
        url: "/cash",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    // Updated PayPal endpoints
    createPaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/create", // Updated URL
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    completePaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/complete", // New endpoint
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    cancelPaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/cancel", // New endpoint
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    getPaymentStatus: builder.query({
      query: (paypalOrderId) => ({
        url: `/stripe-payments/paypal/status/${paypalOrderId}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),

    //start paypal resource payment

    createResourcePaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/resource/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    completeResourcePaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/resource/complete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    cancelResourcePaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/resource/cancel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    getResourcePaymentStatus: builder.query({
      query: (paypalOrderId) => ({
        url: `/stripe-payments/paypal/resource/status/${paypalOrderId}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),

    //end paypal resource payment

    // free course payment
    freeCoursePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/free-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
    freeResurcePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/free-resource",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {
  useStripePaymentMutation,
  useCashPaymentMutation,
  useStripeResourcePaymentMutation,
  useCreatePaypalPaymentMutation,
  useCompletePaypalPaymentMutation, // New hook
  useCancelPaypalPaymentMutation, // New hook
  useGetPaymentStatusQuery, // New hook
  useCreateResourcePaypalPaymentMutation, // New hook
  useCompleteResourcePaypalPaymentMutation, // New hook
  useCancelResourcePaypalPaymentMutation, // New hook
  useGetResourcePaymentStatusQuery, // New hook
  useFreeCoursePaymentMutation,
  useFreeResurcePaymentMutation
} = paymentApi;

export default paymentApi;
