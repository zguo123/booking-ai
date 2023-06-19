"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import {
  useCheckUsernameMutation,
  useCreateUserMutation,
} from "@/redux/services/user";
import { UserParams } from "@/typings/user";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { InputRightElement } from "@chakra-ui/react";
import {
  Field,
  Form,
  FormLayout,
  Loader,
  SubmitButton,
  UseFormReturn,
} from "@saas-ui/react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function OnboardingForm() {
  const { authUser } = useAuthInfo();

  const router = useRouter();

  const [
    checkUsername,
    { isLoading, error, isError, isSuccess },
  ] = useCheckUsernameMutation();

  // mutations
  const [
    createUser,
    { isLoading: isUserCreating, data },
  ] = useCreateUserMutation();

  const form = useRef<UseFormReturn>(null);

  const currUsername = form.current?.getValues("username");

  const validateUsername = debounce(async (username: string) => {
    try {
      const res = await checkUsername(username).unwrap();
    } catch (err) {
      form.current?.setError("username", {
        type: "custom",
        message: err as string,
      });
    }
  }, 100);

  const onSubmit = async (params: Omit<UserParams, "email">) => {
    try {
      const res = await createUser({
        ...params,
        email: authUser?.email,
      }).unwrap();
      if (res.success) {
        router.push("/dashboard");
      }
    } catch (err) {}
  };

  return (
    <Form
      ref={form}
      values={{
        firstName: "",
        lastName: "",
        username: "",
        emailAddress: authUser?.email,
      }}
      defaultValues={{
        firstName: "",
        lastName: "",
        username: "",
        emailAddress: authUser?.email,
      }}
      onSubmit={(value) => {
        const newValue = value as UserParams;
        onSubmit(newValue);
      }}
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
          name="emailAddress"
          label="Email"
          size="lg"
          type="email"
          placeholder="Email"
          defaultValue={authUser?.email}
          help="This email address will be used to log in to your account 
            and cannot be changed now. 
          "
          isDisabled
        />{" "}
        <Field
          name="username"
          label="Username"
          onChange={(e: any) => {
            validateUsername(e.target.value);
          }}
          size="lg"
          rightAddon={
            <InputRightElement>
              {!currUsername ? (
                <></>
              ) : isLoading ? (
                <Loader colorScheme="primary" />
              ) : isSuccess ? (
                <CheckIcon color="green.500" />
              ) : isError ? (
                <CloseIcon color="red.500" />
              ) : (
                <></>
              )}
            </InputRightElement>
          }
          type="text"
          placeholder="Username"
          isRequired
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters long",
            },
          }}
          help="Usernames must only contain letters, numbers, underscores, and dashes."
        />{" "}
        <SubmitButton
          size="lg"
          w="full"
          isLoading={isUserCreating}
          disableIfInvalid
        >
          Finish & Continue
        </SubmitButton>
      </FormLayout>
    </Form>
  );
}
