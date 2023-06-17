import React from "react";
import { AutoForm, Fields, SubmitButton } from "@saas-ui/react";
import { yupForm } from "@saas-ui/forms/yup";
import { object, string } from "yup";

export default function AuthenticateForm() {
  const schema = object().shape({
    email: string().required().label("Email"),
  });
  return (
    <AutoForm
      defaultValues={{
        title: "",
      }}
      onSubmit={() => null}
      submitLabel={null}
      {...yupForm(schema)}
    >
      <SubmitButton colorScheme="secondary" w="full" size="md">
        Continue with Email
      </SubmitButton>
    </AutoForm>
  );
}
