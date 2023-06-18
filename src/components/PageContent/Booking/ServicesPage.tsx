"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import ServiceCheckbox from "@/components/Base/ServiceCheckbox";
import { sampleServices } from "@/lib/consts/services";
import { Heading, Stack, Text, useCheckboxGroup } from "@chakra-ui/react";

export default function ServicesPage() {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  return (
    <BookingLayoutBase
      nextBtnProps={{
        isDisabled: value.length === 0,
      }}
    >
      <Stack pb={4}>
        <Stack spacing={3} pt={10}>
          <Heading size="2xl" textAlign="center">
            Services
          </Heading>{" "}
          <Text fontSize="xl" color="muted" textAlign="center">
            Choose one or more services to book
          </Text>{" "}
        </Stack>{" "}
        <Stack mt={10} spacing={4}>
          {sampleServices.map((service) => (
            <ServiceCheckbox
              key={service.id}
              {...service}
              {...getCheckboxProps({ value: service.id })}
            />
          ))}
        </Stack>
      </Stack>
    </BookingLayoutBase>
  );
}
