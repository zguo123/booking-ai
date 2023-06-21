/**
 * YAN HU HAIR
 *
 * Authentication API for frontend
 *
 * @author Zhaoyu Guo
 */

import { ErrorType } from "@/typings/global";
import { IUserItems, UserParams, UserResponse } from "@/typings/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
  }),
  tagTypes: ["User", "Booking Users"],
  endpoints: (builder) => ({
    searchUser: builder.query<UserResponse, string>({
      query: (query) => ({
        url: `/search?query=${query}`,
        method: "GET",
      }),
      providesTags: ["Booking Users"],
    }),

    createUser: builder.mutation<UserResponse, UserParams>({
      query: (user) => ({
        url: "/create",
        method: "POST",
        body: {
          user: user,
        },
      }),
      invalidatesTags: ["User"],

      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),

    checkUsername: builder.mutation<UserResponse, string>({
      query: (username) => ({
        url: "/check-username",
        method: "POST",
        body: {
          username: username,
        },
      }),
      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),

    getUser: builder.query<UserResponse, undefined>({
      query: () => ({
        url: "/retrieveAuth",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUserQuery,
  useCheckUsernameMutation,
  useSearchUserQuery,
  useLazySearchUserQuery,
} = userApi;
