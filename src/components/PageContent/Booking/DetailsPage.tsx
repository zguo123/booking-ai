"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import useAppointmentInfo from "@/hooks/useAppointmentInfo";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Center,
  Heading,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DateFormatter, parseAbsolute } from "@internationalized/date";
import { useMemo } from "react";

export default function DetailsPage() {
  const { tempAppointmentData, isAppointmentLoading } = useAppointmentInfo();

  // console.log(tempAppointmentData);

  const appointmentDate = useMemo(() => {
    if (isAppointmentLoading) return "";
    const dateTime = parseAbsolute(
      (tempAppointmentData?.appointmentDate as Date)?.toString(),
      "America/Toronto"
    ).toDate();

    const formattedDate = new DateFormatter("en-CA", {
      timeZone: "America/Toronto",
      dateStyle: "long",
      timeStyle: "short",
      hour12: true,
    }).format(dateTime);

    return formattedDate;
  }, [tempAppointmentData, isAppointmentLoading]);

  return (
    <BookingLayoutBase isLoading={isAppointmentLoading}>
      <Center flex="1" pb={4}>
        <Stack textAlign="center" justifyContent="center" spacing={10}>
          <CheckCircleIcon
            color="green.500"
            alignSelf="center"
            fontSize="8xl"
          />
          <Stack spacing={4}>
            <Heading size="2xl" textAlign="center">
              Appointment Booked!
            </Heading>
            <Stack spacing={1}>
              <Text fontSize="2xl" color="muted" textAlign="center">
                Awesome! you're all set. We'll see you on:{" "}
              </Text>{" "}
              <Text fontSize="2xl" color="muted" fontWeight="bold">
                {appointmentDate || ""}
              </Text>
            </Stack>
            <ButtonGroup
              as={Stack}
              direction={{ base: "column", lg: "row" }}
              size="lg"
              justifyContent="center"
              spacing={0}
              mt={4}
            >
              <Button colorScheme="primary">Add to Calendar</Button>{" "}
              <Button colorScheme="blue">Reschedule</Button>{" "}
              <Button colorScheme="red">Cancel</Button>
            </ButtonGroup>
          </Stack>
        </Stack>
      </Center>
    </BookingLayoutBase>
  );
}
