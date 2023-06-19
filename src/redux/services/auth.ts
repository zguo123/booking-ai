/**
 * YAN HU HAIR
 *
 * Authentication API for frontend
 *
 * @author Zhaoyu Guo
 */

import { ErrorType } from "@/typings/global";
import { UserResponse } from "@/typings/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const createAuthApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, string>({
      query: (token) => ({
        url: "/authenticate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }),
      invalidatesTags: ["Auth"],

      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),
  }),
});

export const { useLoginMutation } = createAuthApi;
