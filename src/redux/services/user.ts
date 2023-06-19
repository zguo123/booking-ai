/**
 * YAN HU HAIR
 *
 * Authentication API for frontend
 *
 * @author Zhaoyu Guo
 */

import { ErrorType } from "@/typings/global";
import { IUserItems, UserResponse } from "@/typings/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    createUser: builder.mutation<UserResponse, IUserItems>({
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

    getUser: builder.query<UserResponse, undefined>({
      query: () => ({
        url: "/retrieveAuth",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = userApi;
