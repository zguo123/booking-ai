"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { days } from "@/lib/consts/days";
import { formatMonthYear } from "@/lib/dateHelpers";
import { useRetrieveOneScheduleQuery } from "@/redux/services/availability";
import { AvailabilityItems } from "@/typings/availability";
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
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function UpdateAvailabilityDetails() {
  const params = useParams();

  // auth info
  const { user, isLoading, signOut } = useAuthInfo();

  const router = useRouter();

  const {
    data: scheduleData,
  } = useRetrieveOneScheduleQuery({
    userId: user?._id as string,
    scheduleId: params?.scheduleId as string,
  });

  const scheduleInfo = scheduleData?.schedules as AvailabilityItems;

  return (
    <>
      {" "}
      <FormLayout spacing={6}>
        <Section
          title={`Edit your availability for ${formatMonthYear(
            scheduleInfo?.monthYear as string
          )}`}
          description="You can change your month and year of your schedule here."
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
          title="Edit your working hours for each day of the week"
          description="Great! Now let's edit your working hours for each day of the week."
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
