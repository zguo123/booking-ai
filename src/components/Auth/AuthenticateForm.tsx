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
      <FormLayout>
        <Field
          name="email"
          label="Email"
          size="md"
          type="email"
          placeholder="Email"
          isRequired
          rules={{
            required: "Email is required",
          }}
        />{" "}
        <SubmitButton variant="solid" w="full" size="md" disableIfInvalid>
          Login
        </SubmitButton>
      </FormLayout>
    </Form>

    // <AutoForm
    //   defaultValues={{
    //     title: "",
    //   }}
    //   onSubmit={() => null}
    //   submitLabel={null}
    //   {...yupForm(schema)}
    // >
    //   <SubmitButton colorScheme="secondary" w="full" size="md">
    //     Continue with Email
    //   </SubmitButton>
    // </AutoForm>
  );
}
