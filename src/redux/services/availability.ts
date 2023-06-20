import {
  AvailabilityAPIResponse,
  AvailabilityRequestBody,
} from "@/typings/availability";
import { ErrorType } from "@/typings/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const availabilityApi = createApi({
  reducerPath: "availabilityApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/availability",
  }),

  tagTypes: ["Availabilities", "Availability"],

  endpoints: (builder) => ({
    retrieveAllSchedules: builder.query<AvailabilityAPIResponse, string>({
      query: (userId) => ({
        url: `/retrieveAll?userId=${userId}`,
        method: "GET",
      }),

      providesTags: ["Availabilities"],
    }),

    retrieveOneSchedule: builder.query<
      AvailabilityAPIResponse,
      {
        scheduleId: string;
        userId: string;
      }
    >({
      query: ({ scheduleId, userId }) => ({
        url: `/options/${scheduleId}/retrieve?userId=${userId}`,
        method: "GET",
      }),

      providesTags: ["Availability"],
    }),

    deleteSchedule: builder.mutation<AvailabilityAPIResponse, string>({
      query: (scheduleId) => ({
        url: `/options/${scheduleId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Availability", "Availabilities"],
    }),

    editAvailabilitySchedule: builder.mutation<
      AvailabilityAPIResponse,
      AvailabilityRequestBody & { userId: string; scheduleId: string }
    >({
      query: ({ userId, scheduleId, ...availabilityData }) => ({
        url: `/options/${scheduleId}/edit?userId=${userId}`,
        method: "PATCH",
        body: {
          availabilityData: { ...availabilityData },
        },
      }),

      invalidatesTags: ["Availability", "Availabilities"],

      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),

    createAvailabilitySchedule: builder.mutation<
      AvailabilityAPIResponse,
      AvailabilityRequestBody & { userId: string }
    >({
      query: ({ userId, ...availabilityData }) => ({
        url: `/create`,
        method: "POST",
        body: {
          availabilityData: { ...availabilityData },
          userId,
        },
      }),
      invalidatesTags: ["Availabilities"],
      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),
  }),
});

export const {
  useCreateAvailabilityScheduleMutation,
  useRetrieveAllSchedulesQuery,
  useRetrieveOneScheduleQuery,
  useLazyRetrieveOneScheduleQuery,
  useDeleteScheduleMutation,
  useEditAvailabilityScheduleMutation,
} = availabilityApi;
