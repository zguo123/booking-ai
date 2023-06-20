"use client";
import DashboardShell from "@/components/Base/DashboardShell";
import useAuthInfo from "@/hooks/useAuthInfo";
import { days } from "@/lib/consts/days";
import { formatMonthYear, getMonthNameFromNumber } from "@/lib/dateHelpers";
import {
  useCreateAvailabilityScheduleMutation,
  useEditAvailabilityScheduleMutation,
} from "@/redux/services/availability";
import {
  AvailabilityDate,
  AvailabilityItems,
  AvailabilityRequestBody,
  WorkingHours,
} from "@/typings/availability";
import { Container } from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { Form, SubmitButton, UseFormReturn, useSnackbar } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useRetrieveOneScheduleQuery } from "@/redux/services/availability";
import UpdateAvailabilityDetails from "@/components/DashboardComponents/UpdateAvailabilityDetails";
import { sanitizeSchedule } from "@/lib/scheduleHelpers";

export type AvailabilityDetailsPageProps = {
  scheduleId: string;
  scheduleData: AvailabilityItems;
};

export default function AvailabilityDetailsPage({
  scheduleId,
  scheduleData,
}: AvailabilityDetailsPageProps) {
  const formRef = React.useRef<UseFormReturn>(null);

  const { user } = useAuthInfo();

  const snackbar = useSnackbar();

  const router = useRouter();

  const [
    editAvailability,
    { isLoading: isAvailabilityLoading },
  ] = useEditAvailabilityScheduleMutation();

  const onSubmit = async (data: AvailabilityRequestBody) => {
    try {

      const sanitizedDate = sanitizeSchedule(data);

      const res = await editAvailability({
        ...sanitizedDate,
        userId: user?._id as string,
        scheduleId,
      }).unwrap();

      if (res.success) {
        snackbar.success({
          title: "Schedule Edited",
          description: `Your schedule has been Edited for the month of ${formatMonthYear(
            sanitizedDate?.monthYear
          )}`,
          duration: 5000,
          isClosable: true,
        });

        router.replace("/dashboard/availability");
      }
    } catch (error) {
      const err = error as { [key: string]: string };

      Object.keys(err).forEach((key: string) => {
        if (days.includes(key as AvailabilityDate)) {
          formRef.current?.setError(`${key}.from`, {
            type: "custom",
            message: err[key as string] as string,
          });
          formRef.current?.setError(`${key}.to`, {
            type: "custom",
            message: err[key as string] as string,
          });
        } else {
          formRef.current?.setError(key, {
            type: "custom",
            message: err[key as string] as string,
          });
        }
      });
    }
  };

  return (
    <Form
      ref={formRef}
      onSubmit={(values) => {
        onSubmit(values as AvailabilityRequestBody);
      }}
      defaultValues={{
        ...scheduleData,
      }}
    >
      <DashboardShell
        additionalActions={{
          pathname: `/dashboard/availability/${scheduleId}`,
          items: (
            <SubmitButton
              isLoading={isAvailabilityLoading}
              disableIfUntouched
              disableIfInvalid
            >
              Edit Schedule
            </SubmitButton>
          ),
        }}
      >
        <Container maxW="container.xl" py={5}>
          <UpdateAvailabilityDetails />
        </Container>
      </DashboardShell>
    </Form>
  );
}
