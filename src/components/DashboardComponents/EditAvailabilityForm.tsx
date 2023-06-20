"use client";

import { days } from "@/lib/consts/days";
import { Section } from "@saas-ui/pro";
import {
  Card,
  CardBody,
  DisplayIf,
  Field,
  FormLayout,
  ObjectField,
  UseFormReturn,
} from "@saas-ui/react";
import React from "react";

export default function EditAvailabilityForm() {
  return (
    <>
      {" "}
      <FormLayout spacing={6}>
        <Section
          title="Let's start with the month"
          description="Select the month and year you want to add your schedule for"
        >
          <Card>
            <CardBody>
              <FormLayout>
                <Field
                  type="month"
                  name="monthYear"
                  label="Month and Year"
                  rules={{
                    required: "A valid month is required",
                  }}
                  isRequired
                />
              </FormLayout>
            </CardBody>
          </Card>
        </Section>{" "}
        <Section
          title="Add your working hours for each day of the week"
          description="Great! Now let's add your working hours for each day of the week."
        >
          <Card>
            <CardBody>
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
                    />
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
                            required: "A valid end time is required",
                          }}
                        />
                      </FormLayout>
                    </DisplayIf>
                  </ObjectField>
                ))}
              </FormLayout>
            </CardBody>
          </Card>
        </Section>
      </FormLayout>
    </>
  );
}
