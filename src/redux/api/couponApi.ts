import { baseApi } from "./baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyCoupon: builder.mutation({
      query: (body: { code: string,userId:string }) => ({
        url: "/coupons/apply",
        method: "POST",
        body,
      }),
    }),
    confirmApplyCoupon: builder.mutation({
      query: (body: { code: string;
        userId:string;
         amount: number; orderId: 
         string; }) => ({
        url: "/coupons/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Coupon"],
    }),
    createCoupon: builder.mutation({
      query: (body) => ({
        url: "/coupons/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Coupon"],
    }),
    getCoupons: builder.query({
      query: () => ({
        url: "/coupons",
        method: "GET",
      }),
      providesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/coupons/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Coupon"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
  }),
});

export const {
  useApplyCouponMutation,
  useConfirmApplyCouponMutation,
  useCreateCouponMutation,
  useGetCouponsQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} = couponApi;