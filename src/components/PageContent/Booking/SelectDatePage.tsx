"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import useBookBaseUrl from "@/hooks/useBookBaseUrl";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { getHours, getTimeStatus } from "@/lib/api/appointment/helpers";
import { convert12HourTo24Hour } from "@/lib/dateHelpers";
import { useSelectTimeMutation } from "@/redux/services/bookAppointment";
import {
  AppointmentCookieData,
  AppointmentItems,
} from "@/typings/appointments";
import { AvailabilityItems } from "@/typings/availability";
import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  DatePickerCalendar,
  DatePickerStatic,
  DateValue,
  getLocalTimeZone,
  parseTime,
  today,
} from "@saas-ui/date-picker";
import {
  Card,
  CardBody,
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@saas-ui/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useCallback, useMemo } from "react";

export type SelectDatePageProps = {
  appointmentCookie: AppointmentCookieData;
  currentAppointments: AppointmentItems[];
};

export default function SelectDatePage({
  appointmentCookie,
  currentAppointments,
}: SelectDatePageProps) {
  const [value, setValue] = React.useState<DateValue>(
    today(getLocalTimeZone())
  );

  const times = getTimeStatus(currentAppointments);

  const bookBase = useBookBaseUrl();

  const [newTime, setTime] = React.useState<string>("");

  const [selectTime, { isLoading: isSelectingTime }] = useSelectTimeMutation();

  // user info
  const { availabilitySchedules: schedules, isUserLoading } = useGetUserInfo();

  const router = useRouter();

  const date = useMemo(() => {
    const currMonthYear = value.toString().split("-").slice(0, 2).join("-");


    const hours = getHours(
      schedules as AvailabilityItems[],
      currMonthYear,
      value?.toDate(getLocalTimeZone())?.toDateString(),
      appointmentCookie?.totalDuration as number,
      currentAppointments
    );

    return hours;
  }, [value, schedules, currentAppointments, appointmentCookie]);

  const chooseTime = useCallback(
    async (selectedTime: string) => {
      try {
        // convert DateValue + string to Date
        const time = parseTime(convert12HourTo24Hour(selectedTime)); // Assuming this returns a Time object
        const date = value?.toDate(getLocalTimeZone()); // Assuming this returns a valid Date object

        const dateTime = new Date(date);
        dateTime.setHours(time.hour);
        dateTime.setMinutes(time.minute);
        dateTime.setSeconds(time.second);

        const res = await selectTime(dateTime).unwrap();

        if (res?.success) {
          router?.push(`${bookBase}/contact`);
        }
      } catch (err) {}

      // router?.push(`${bookBase}/contact`);
    },
    [value]
  );

  return (
    <BookingLayoutBase isLoading={isUserLoading}>
      <Stack w="full" pb={4}>
        <Stack spacing={3} pt={10}>
          <Heading size="2xl" textAlign="center">
            Choose Date & Time
          </Heading>{" "}
          <Text fontSize="xl" color="muted" textAlign="center">
            Select your preferred date and time for the session
          </Text>{" "}
        </Stack>{" "}
        <Stack
          flexDir={{
            base: "column",
            md: "row",
          }}
          mt={{
            base: 5,
            md: 10,
          }}
          spacing={10}
        >
          <Center alignItems="flex-start">
            <Card>
              <CardBody p={4}>
                <DatePickerStatic
                  value={value}
                  minValue={today(getLocalTimeZone())}
                  onChange={(value) => {
                    if (!value) {
                      return;
                    }

                    setValue(value);
                    setTime("");
                  }}
                >
                  <DatePickerCalendar />
                </DatePickerStatic>
              </CardBody>
            </Card>
          </Center>
          <Stack w="full" spacing={3}>
            <Heading size="md">
              Times for: {value?.toDate(getLocalTimeZone()).toDateString()}
            </Heading>
            {date.length > 0 ? (
              <>
                <SimpleGrid columns={3} spacing={3}>
                  {date.map((time) => {
                    const Wrapper =
                      time?.status === "booked" ? Tooltip : Fragment;

                    return (
                      <Wrapper label="Booked" w="full">
                        <Button
                          size={{
                            base: "md",
                            md: "lg",
                          }}
                          variant="outline"
                          key={`${time?.time}`}
                          isActive={
                            time.status === "available" && time.time === newTime
                          }
                          colorScheme={
                            time.status === "available"
                              ? "green"
                              : time.status === "booked"
                              ? "red"
                              : "auto"
                          }
                          isLoading={isSelectingTime}
                          onClick={() => {
                            // set time
                            setTime(time?.time);

                            // set date
                            chooseTime(time?.time);
                          }}
                          isDisabled={
                            time.status === "unavailable" ||
                            time.status === "booked"
                          }
                        >
                          {time?.time} is {time?.status}
                        </Button>
                      </Wrapper>
                    );
                  })}{" "}
                </SimpleGrid>
              </>
            ) : (
              <EmptyStateContainer colorScheme="purple">
                <EmptyStateBody>
                  <EmptyStateIcon as={WarningIcon} />

                  <EmptyStateTitle>
                    No times available for{" "}
                    {value?.toDate(getLocalTimeZone()).toDateString()}
                  </EmptyStateTitle>
                  <EmptyStateDescription>
                    Please choose another date
                  </EmptyStateDescription>
                </EmptyStateBody>
              </EmptyStateContainer>
            )}
            <Text fontSize="xl" color="muted" textAlign="center"></Text>{" "}
          </Stack>
        </Stack>
      </Stack>
    </BookingLayoutBase>
  );
}
