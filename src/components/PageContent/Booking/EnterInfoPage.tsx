"use client";

import BookingLayoutBase from "@/components/Base/BookingLayoutBase";
import useBookBaseUrl from "@/hooks/useBookBaseUrl";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import { useConfirmAppointmentMutation } from "@/redux/services/bookAppointment";
import { ContactInfo } from "@/typings/appointments";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Container,
  Divider,
  HStack,
  Heading,
  Input,
  InputGroup,
  Stack,
  Text,
  forwardRef,
} from "@chakra-ui/react";
import {
  Field,
  Form,
  FormLayout,
  SubmitButton,
  UseFormReturn,
  registerFieldType,
  useSnackbar,
} from "@saas-ui/react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
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

export default function EnterInfoPage() {
  const router = useRouter();

  const bookBase = useBookBaseUrl();

  const formRef = useRef<UseFormReturn>(null);

  const { user } = useGetUserInfo();

  const [
    confirm,
    { isLoading: isConfirming },
  ] = useConfirmAppointmentMutation();

  const onSubmit = async (data: ContactInfo) => {
    try {
      const res = await confirm({
        userId: user?._id as string,
        ...data,
      }).unwrap();

      if (res.success) {
        return router.push(`${bookBase}/details`);
      }
    } catch (error) {
      const err = error as { [key: string]: string };

      Object.keys(err).forEach((key: string) => {
        formRef.current?.setError(key, {
          type: "custom",
          message: err[key as string] as string,
        });
      });
    }
  };

  return (
    <BookingLayoutBase>
      <Stack w="full" pb={4}>
        <Stack spacing={3} pt={10}>
          <Heading size="2xl" textAlign="center">
            Enter your information
          </Heading>{" "}
          <Text fontSize="xl" color="muted" textAlign="center">
            Please enter your information below
          </Text>{" "}
          <Container
            mt={4}
            as={Form}
            ref={formRef}
            maxW="container.lg"
            defaultValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              appointmentNotes: "",
            }}
            onSubmit={(value) => {
              onSubmit(value as ContactInfo);
            }}
          >
            <FormLayout spacing={3}>
              {" "}
              <Field
                size="lg"
                name="phone"
                type="maskedInput"
                inputMode="tel"
                label="Phone"
                help="We'll send you a text to confirm your appointment"
                rules={{
                  required: "Phone is required",
                }}
                isRequired
              />{" "}
              <Field
                size="lg"
                name="email"
                label="Email"
                type="email"
                help="If you want to receive a confirmation email"
              />
              <FormLayout columns={2}>
                <Field
                  size="lg"
                  name="firstName"
                  label="First Name"
                  rules={{
                    required: "First Name is required",
                  }}
                  isRequired
                />{" "}
                <Field
                  size="lg"
                  name="lastName"
                  label="Last Name"
                  rules={{
                    required: "Last Name is required",
                  }}
                  isRequired
                />
              </FormLayout>{" "}
              <Field
                size="lg"
                type="textarea"
                name="additionalNotes"
                label="Additional Notes (optional)"
              />
              <Divider my={0.5} />
              <Text fontSize="md" color="muted">
                Upon booking, you will receive a text message to confirm your
                appointment and an account will be created for you to manage
                your appointments.
              </Text>
              <SubmitButton
                colorScheme="blue"
                variant="solid"
                w="full"
                size="lg"
                isLoading={isConfirming}
                disableIfInvalid
              >
                Book Appointment
              </SubmitButton>
            </FormLayout>
          </Container>
        </Stack>{" "}
      </Stack>
    </BookingLayoutBase>
  );
}
