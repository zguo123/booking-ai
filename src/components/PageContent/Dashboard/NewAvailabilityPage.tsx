"use client";
import DashboardShell from "@/components/Base/DashboardShell";
import AddAvailabilityForm from "@/components/DashboardComponents/AddAvailabilityForm";
import useAuthInfo from "@/hooks/useAuthInfo";
import { formatMonthYear, getMonthNameFromNumber } from "@/lib/dateHelpers";
import { days } from "@/lib/consts/days";
import { useCreateAvailabilityScheduleMutation } from "@/redux/services/availability";
import {
  AvailabilityRequestBody,
  WorkingHours,
  AvailabilityDate,
} from "@/typings/availability";
import { Container } from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { Form, SubmitButton, UseFormReturn, useSnackbar } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { sanitizeSchedule } from "@/lib/scheduleHelpers";

export default function NewAvailabilityPage() {
  const formRef = React.useRef<UseFormReturn>(null);

  const { user } = useAuthInfo();

  const snackbar = useSnackbar();

  const router = useRouter();

  const [
    addAvailability,
    { isLoading: isAvailabilityLoading },
  ] = useCreateAvailabilityScheduleMutation();

  const onSubmit = async (data: AvailabilityRequestBody) => {
    try {
      const sanitizedDate = sanitizeSchedule(data);

      const res = await addAvailability({
        ...sanitizedDate,
        userId: user?._id as string,
      }).unwrap();

      if (res.success) {
        snackbar.success({
          title: "Schedule added",
          description: `Your schedule has been added for the month of ${formatMonthYear(
            sanitizedDate?.monthYear
          )}
          `,
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
    >
      <DashboardShell
        additionalActions={{
          pathname: "/dashboard/availability/new",
          items: (
            <SubmitButton
              isLoading={isAvailabilityLoading}
              disableIfUntouched
              disableIfInvalid
            >
              Add Schedule
            </SubmitButton>
          ),
        }}
      >
        <Container maxW="container.xl" py={5}>
          <AddAvailabilityForm />
        </Container>
      </DashboardShell>
    </Form>
  );
}
