/* eslint-disable @typescript-eslint/no-unused-vars */
// import { authKey } from "@/constants/authkey";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!baseUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_BASE_URL is not set");
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // const state = getState() as RootState;
      const token = Cookies.get("token");
      // const token = localStorage.getItem("token");
      // const token = state?.auth?.token;

      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  tagTypes: [
    "User",
    "Course",
    "Review",
    "Payment",
    "Orders",
    "Resource",
    "Statistics",
    "Subscribe",
    "Progress",
    "Resume",
    "LearningData",
    "Included",
    "RefundRequest",
    "Coupon",
  ],
  endpoints: (builder) => ({}),
});
