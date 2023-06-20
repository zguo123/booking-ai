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
} = availabilityApi;
