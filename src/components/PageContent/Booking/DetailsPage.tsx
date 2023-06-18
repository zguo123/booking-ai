"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Center,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  forwardRef,
} from "@chakra-ui/react";
import { registerFieldType } from "@saas-ui/react";
import ReactInputMask from "react-input-mask";

registerFieldType(
  "maskedInput",
  forwardRef(
    ({ type = "text", leftAddon, rightAddon, size, mask, ...rest }, ref) => {
      const inputProps = {
        type,
        size,
        ...rest,
        ref,
      };
      const input = (
        <Input as={ReactInputMask} mask={"(999) 999-9999"} {...inputProps} />
      );

      if (leftAddon || rightAddon) {
        return (
          <InputGroup size={size}>
            {leftAddon}
            {input}
            {rightAddon}
          </InputGroup>
        );
      }

      return input;
    }
  ),
  {
    isControlled: true,
  }
);

export default function DetailsPage() {
  const onSubmit = (params: any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  return (
    <BookingLayoutBase>
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
            <Text fontSize="2xl" color="muted" textAlign="center">
              Awesome! you're all set. We'll see you on{" "}
              <Text as="span" fontWeight="bold">
                Sunday, June 20th at 10:00 AM
              </Text>
            </Text>{" "}
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
