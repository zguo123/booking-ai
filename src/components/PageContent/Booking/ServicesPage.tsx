"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import ServiceCheckbox from "@/components/Base/ServiceCheckbox";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { sampleServices } from "@/lib/consts/services";
import { Heading, Stack, Text, useCheckboxGroup } from "@chakra-ui/react";

export default function ServicesPage() {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const { services, isUserLoading } = useGetUserInfo();

  return (
    <BookingLayoutBase
      isLoading={isUserLoading}
      nextBtnProps={{
        isDisabled: value.length === 0,
      }}
    >
      <Stack pb={4} w="full">
        <Stack spacing={3} pt={10}>
          <Heading size="2xl" textAlign="center">
            Services
          </Heading>{" "}
          <Text fontSize="xl" color="muted" textAlign="center">
            Choose one or more services to book
          </Text>{" "}
        </Stack>{" "}
        <Stack mt={10} spacing={4}>
          {services?.map((service) => (
            <ServiceCheckbox
              key={service?._id}
              {...service}
              {...getCheckboxProps({ value: service?._id })}
            />
          ))}
        </Stack>
      </Stack>
    </BookingLayoutBase>
  );
}
