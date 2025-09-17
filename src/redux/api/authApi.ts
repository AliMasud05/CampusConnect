import { baseApi } from "@/redux/api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: { email },
      }),
    }),
    //update password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getMeWithProgress: builder.query({
      query: () => ({
        url: "/auth/profile-with-progress",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    verifyOtp: builder.mutation({
      query: (data: { email: string; otp: number }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: (data: { password: string }) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    getAllUser: builder.query({
      query: ({ page = 1, limit = 10 } ) => ({
        url: "/users",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["User"],
    }),

    //update user by id
    updateUserById: builder.mutation({
      query: ([id, data]) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUserById: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    //update user

    updateUSer: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    resendOtp: builder.mutation({
      query: (email) => ({
        url: "/users/resend-otp",
        method: "POST",
        body: email,
      }),
      invalidatesTags: ["User"],
    }),

    contactUs: builder.mutation({
      query: (data) => ({
        url: "/contact-us",
        method: "POST",
        body: data,
      }),
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/google-login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useGetMeWithProgressQuery,
  useGetAllUserQuery,
  useForgotPasswordMutation,
  useUpdatePasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserByIdMutation,
  useUpdateUSerMutation,
  useResendOtpMutation,
  useContactUsMutation,
  useGetUserByIdQuery,
  useGoogleLoginMutation
} = authApi;
