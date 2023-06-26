"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import ServiceCheckbox from "@/components/Base/ServiceCheckbox";
import useBookBaseUrl from "@/hooks/useBookBaseUrl";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { sampleServices } from "@/lib/consts/services";
import { useAddServicesMutation } from "@/redux/services/bookAppointment";
import { Heading, Stack, Text, useCheckboxGroup } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const { value, getCheckboxProps } = useCheckboxGroup({
    defaultValue: [],
  });

  const { user, services, isUserLoading } = useGetUserInfo();

  const base = useBookBaseUrl();

  const router = useRouter();

  const [
    addServices,
    { isLoading: isAddingServices },
  ] = useAddServicesMutation();

  const next = async () => {
    try {
      const res = await addServices({
        services: value as string[],
        userId: user?._id as string,
      }).unwrap();

      if (res?.success) {
        router.push(`${base}/select-date`);
      }
    } catch (err) {}
  };

  return (
    <BookingLayoutBase
      isLoading={isUserLoading}
      nextBtnProps={{
        isLoading: isAddingServices,
        isDisabled: value.length === 0,
        onClick: next,
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
              {...getCheckboxProps({ value: service?.name })}
            />
          ))}
        </Stack>
      </Stack>
    </BookingLayoutBase>
  );
}
