"use client";

import useAuthentication from "@/hooks/useAuthentication";
import { Form, FormLayout, Field, SubmitButton } from "@saas-ui/react";
import React from "react";

export default function OnboardingForm() {
  const { authUser } = useAuthentication();

  return (
    <Form
      defaultValues={{
        firstName: "",
        lastName: "",
        username: "",
        email: authUser?.email,
      }}
      onSubmit={() => null}
    >
      <FormLayout spacing={4}>
        <FormLayout columns={2}>
          <Field
            name="firstName"
            label="First Name"
            size="lg"
            type="text"
            placeholder="First Name"
            isRequired
            rules={{
              required: "First Name is required",
            }}
          />{" "}
          <Field
            name="lastName"
            label="Last Name"
            size="lg"
            type="text"
            placeholder="Last Name"
            isRequired
            rules={{
              required: "Last Name is required",
            }}
          />
        </FormLayout>{" "}
        <Field
          name="email"
          label="Email"
          size="lg"
          type="email"
          placeholder="Email"
          defaultValue={authUser?.email}
          isDisabled
          help="This email address will be used to log in to your account."
          isRequired
        />{" "}
        <Field
          name="username"
          label="Username"
          size="lg"
          type="text"
          placeholder="Username"
          isRequired
          rules={{
            required: "Username is required",
          }}
          help="Usernames must only contain letters, numbers, underscores, and dashes."
        />{" "}
        <SubmitButton size="lg" w="full" disableIfInvalid disableIfUntouched>
          Finish & Continue
        </SubmitButton>
      </FormLayout>
    </Form>
  );
}
