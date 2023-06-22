import {
  AppointmentCookieData,
  AppointmentResponse,
} from "@/typings/appointments";
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
      AppointmentCookieData["services"]
    >({
      query: (services) => ({
        url: `/select-services`,
        method: "POST",
        body: {
          appointmentData: { services },
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
  }),
});

export const {
  useAddServicesMutation,
  useSelectTimeMutation,
} = bookAppointmentApi;
