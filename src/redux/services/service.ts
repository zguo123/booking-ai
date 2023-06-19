import { ErrorType } from "@/typings/global";
import { ServiceAPIResponse, ServiceRequestBody } from "@/typings/service";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const servicesApi = createApi({
  reducerPath: "servicesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/services",
  }),

  tagTypes: ["Services"],

  endpoints: (builder) => ({
    retrieveServices: builder.query<ServiceAPIResponse, string>({
      query: (userId) => ({
        url: `/retrieve?userId=${userId}`,
        method: "GET",
      }),

      providesTags: ["Services"],
    }),

    deleteService: builder.mutation<ServiceAPIResponse, string>({
      query: (serviceId) => ({
        url: `/options/${serviceId}/delete`,
        method: "DELETE",
      }),

      invalidatesTags: ["Services"],
    }),

    createService: builder.mutation<
      ServiceAPIResponse,
      ServiceRequestBody & { userId: string }
    >({
      query: ({ userId, ...serviceData }) => ({
        url: "/create",
        method: "POST",
        body: {
          serviceData: { ...serviceData },
          userId: userId,
        },
      }),
      invalidatesTags: ["Services"],
      transformErrorResponse: (error: any): ErrorType["message"] => {
        return error?.data?.error?.message;
      },
    }),
  }),
});

export const {
  useRetrieveServicesQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
