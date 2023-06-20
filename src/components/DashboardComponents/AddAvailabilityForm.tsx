"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { days } from "@/lib/consts/days";
import { useCreateServiceMutation } from "@/redux/services/service";
import { ButtonGroup, Spacer, Text } from "@chakra-ui/react";
import {
  DisplayIf,
  Field,
  FormLayout,
  FormStep,
  FormStepper,
  NextButton,
  ObjectField,
  PrevButton,
  Property,
  StepForm,
  UseFormReturn,
  PropertyList,
  useSnackbar,
  FormValue,
} from "@saas-ui/react";
import React from "react";

export default function AddAvailabilityForm() {
  const formRef = React.useRef<UseFormReturn>(null);

  const snackbar = useSnackbar();

  const { user } = useAuthInfo();

  const [createService, { isLoading }] = useCreateServiceMutation();

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
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
    <>
      {" "}
      {/* */}
      <StepForm defaultValues={{}} onSubmit={onSubmit}>
        <FormLayout>
          <FormStep name="basic">
            <FormLayout>
              {" "}
              <Field
                type="month"
                name="date"
                label="Month and Year"
                rules={{
                  required: "A valid month is required",
                }}
                isRequired
              />
            </FormLayout>
          </FormStep>
          <FormStep name="hours">
            <FormLayout>
              {days.map((day, index) => (
                <ObjectField
                  key={index}
                  name={`${day}`}
                  label={day[0].toUpperCase() + day.slice(1)}
                  isRequired
                >
                  <Field
                    type="checkbox"
                    name={`isClosed`}
                    label={`Enable ${day[0].toUpperCase() + day.slice(1)}`}
                  />{" "}
                  <DisplayIf name={`isClosed`} condition={(value) => !!value}>
                    <FormLayout columns={2}>
                      <Field
                        type="time"
                        name={`${day}.from`}
                        label="Start Time"
                        isRequired
                        rules={{
                          required: "A valid start time is required",
                        }}
                      />
                      <Field
                        type="time"
                        name={`${day}.to`}
                        label="End Time"
                        isRequired
                        rules={{
                          required: "A valid start time is required",
                        }}
                      />
                    </FormLayout>
                  </DisplayIf>
                </ObjectField>
              ))}{" "}
            </FormLayout>
          </FormStep>{" "}
          <ButtonGroup w="full">
            <PrevButton variant="ghost" />
            <Spacer />
            <NextButton />
          </ButtonGroup>
        </FormLayout>
      </StepForm>
    </>
  );
}
