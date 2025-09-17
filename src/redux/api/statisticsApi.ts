import { baseApi } from "./baseApi";

const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentPayments: builder.query({
      query: () => ({
        url: "/statistics/recent-payments",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
    getToSellingCourses: builder.query({
      query: () => ({
        url: "/statistics/top-courses",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
    getSalesReport: builder.query({
      query: () => ({
        url: "/statistics/sales-report",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
    getMonthSalesReport: builder.query({
      query: () => ({
        url: "/statistics/monthly-sales",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
    getUserRegistrationStats: builder.query({
      query: () => ({
        url: "/statistics/user-registrations",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
    getCourseAndUserStats: builder.query({
      query: () => ({
        url: "/statistics/course-sales-report",
        method: "GET",
      }),
      providesTags: ["Statistics"],
      // Polling for real-time updates (every 30 seconds)
    }),
    getTotalEnrollments: builder.query({
      query: () => ({
        url: "/statistics/total-enrollments",
        method: "GET",
      }),
      providesTags: ["Statistics"],
    }),
  }),
});

export const {
  useGetRecentPaymentsQuery,
  useGetToSellingCoursesQuery,
  useGetSalesReportQuery,
  useGetMonthSalesReportQuery,
  useGetUserRegistrationStatsQuery,
  useGetCourseAndUserStatsQuery,
  useGetTotalEnrollmentsQuery,
} = statisticsApi;
