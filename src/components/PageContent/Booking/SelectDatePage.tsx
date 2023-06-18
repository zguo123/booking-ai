"use client";

import { sampleDates } from "@/lib/consts/dates";
import { convert12HourTo24Hour } from "@/lib/dateHelpers";
import { WarningIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  DatePickerCalendar,
  DatePickerStatic,
  DateValue,
  Time,
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
import React, { useCallback, useMemo } from "react";

export default function SelectDatePage() {
  const [value, setValue] = React.useState<DateValue>(
    today(getLocalTimeZone())
  );

  const [newTime, setTime] = React.useState<string>("");

  const [chosenTime, setChosenTime] = React.useState<Date>();

  const router = useRouter();

  const date = useMemo(() => {
    return sampleDates.find((date) => {
      return (
        date.date.toDateString() ===
        value?.toDate(getLocalTimeZone()).toDateString()
      );
    });
  }, [value]);

  const chooseTime = (selectedTime: string) => {
    // convert DateValue + string to Date
    const time = parseTime(convert12HourTo24Hour(selectedTime)); // Assuming this returns a Time object
    const date = value?.toDate(getLocalTimeZone()); // Assuming this returns a valid Date object

    const dateTime = new Date(date);
    dateTime.setHours(time.hour);
    dateTime.setMinutes(time.minute);
    dateTime.setSeconds(time.second);

    setChosenTime(dateTime);

    router?.push("/book/contact");
  };

  return (
    <Stack pb={4}>
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
        <Center>
          <Card>
            <CardBody p={4}>
              <DatePickerStatic
                value={value}
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
          {date ? (
            <>
              <SimpleGrid columns={3} spacing={3}>
                {date.times.map((time) => (
                  <Button
                    size={{
                      base: "md",
                      md: "lg",
                    }}
                    variant="outline"
                    key={`${time?.time}-${date.id}`}
                    isActive={
                      time.status === "available" && time.time === newTime
                    }
                    onClick={() => {
                      // set time
                      setTime(time?.time);

                      // set date
                      chooseTime(time?.time);
                    }}
                    isDisabled={
                      time.status === "unavailable" || time.status === "booked"
                    }
                  >
                    {time?.time}
                  </Button>
                ))}{" "}
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
  );
}
