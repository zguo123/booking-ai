"use client";

import {
  Container,
  Divider,
  Heading,
  InputRightAddon,
  SimpleGrid,
  Stack,
  InputProps,
  Text,
  forwardRef,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { object, string } from "yup";
import { yupForm } from "@saas-ui/forms/yup";
import {
  AutoForm,
  BaseField,
  Field,
  FieldProps,
  Form,
  FormLayout,
  InputField,
  SubmitButton,
  registerFieldType,
  useFormContext,
} from "@saas-ui/react";
import ReactInputMask, { Props } from "react-input-mask";

const MaskedInputField = registerFieldType(
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
  const onSubmit = (params: any) => {
    console.log(params);
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  };

  return (
    <Stack pb={4}>
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
          maxW="container.lg"
          defaultValues={{
            name: "",
            description: "",
          }}
          onSubmit={onSubmit}
        >
          <FormLayout spacing={4}>
            {" "}
            <FormLayout columns={2}>
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
              />
              <Field
                name="description"
                label="Description"
                size="lg"
                placeholder="Optional description"
              />
            </FormLayout>
            <Divider />
            <SubmitButton
              colorScheme="blue"
              variant="solid"
              w="full"
              size="lg"
              disableIfInvalid
            >
              Book Appointment
            </SubmitButton>
          </FormLayout>
        </Container>
      </Stack>{" "}
    </Stack>
  );
}
