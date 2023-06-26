import { ContactInfo } from "./../../typings/appointments.d";
import {
  AppointmentCookieData,
  AppointmentResponse,
} from "@/typings/appointments";
import { ErrorType } from "@/typings/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const bookAppointmentApi = createApi({
  reducerPath: "bookAppointmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/book/appointment",
  }),

  tagTypes: ["BookAppointment", "BookAppointments"],

  endpoints: (builder) => ({
    addServices: builder.mutation<
      AppointmentResponse,
      {
        services: string[];
        userId: string;
      }
    >({
      query: ({ userId, services }) => ({
        url: `/select-services`,
        method: "POST",
        body: {
          userId,
          appointmentData: {
            services: [...services],
          },
        },
      }),

      invalidatesTags: ["BookAppointment", "BookAppointments"],
    }),

    selectTime: builder.mutation<
      AppointmentResponse,
      AppointmentCookieData["appointmentDate"]
    >({
      query: (appointmentDate) => ({
        url: `/select-date`,
        method: "POST",
        body: {
          appointmentData: {
            appointmentDate,
          },
        },
        invalidatesTags: ["BookAppointment", "BookAppointments"],
      }),
    }),

    confirmAppointment: builder.mutation<
      AppointmentResponse,
      ContactInfo & { userId: string }
    >({
      query: ({ userId, ...contactData }) => ({
        url: `/confirm`,
        method: "POST",
        body: {
          appointmentData: { ...contactData },
          userId,
        },
      }),

      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),

    retrieveAppointments: builder.query<
      AppointmentResponse,
      {
        userId: string;
        appointmentId?: string;
      }
    >({
      query: ({ userId, appointmentId }) => ({
        url: `/retrieve?userId=${userId}${
          appointmentId ? `&appointmentId=${appointmentId}` : ""
        }`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddServicesMutation,
  useSelectTimeMutation,
  useConfirmAppointmentMutation,
  useRetrieveAppointmentsQuery,
  useLazyRetrieveAppointmentsQuery,
} = bookAppointmentApi;
