import React from "react";
import {
  AutoForm,
  Field,
  Fields,
  Form,
  FormLayout,
  SubmitButton,
} from "@saas-ui/react";
import { yupForm } from "@saas-ui/forms/yup";
import { object, string } from "yup";
import { useRouter } from "next/navigation";
import validator from "validator";

export default function AuthenticateForm() {
  const router = useRouter();

  const onSubmit = (params: any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
      router.push("/book/details");
    });
  };
  return (
    <Form
      defaultValues={{
        email: "",
      }}
      onSubmit={onSubmit}
    >
      <FormLayout spacing={5}>
        <Field
          name="email"
          label="Email"
          size="lg"
          type="email"
          placeholder="Email"
          isRequired
          rules={{
            required: "Email is required",
            validate: (value: string) => {
              if (!validator.isEmail(value)) return "Email is invalid";
            },
          }}
        />{" "}
        <SubmitButton
          variant="solid"
          colorScheme="primary"
          w="full"
          size="lg"
          disableIfInvalid
        >
          Continue with Email
        </SubmitButton>
      </FormLayout>
    </Form>
  );
}
