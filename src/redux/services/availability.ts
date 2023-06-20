import { AvailabilityRequestBody } from "@/typings/availability";
import { AvailabilityAPIResponse } from "@/typings/availability";
import { ErrorType } from "@/typings/global";
import { ServiceAPIResponse, ServiceRequestBody } from "@/typings/service";
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
        url: `/retrieve?userId=${userId}`,
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
    }),
  }),
});

export const {
  useCreateAvailabilityScheduleMutation,
  useRetrieveAllSchedulesQuery,
} = availabilityApi;
