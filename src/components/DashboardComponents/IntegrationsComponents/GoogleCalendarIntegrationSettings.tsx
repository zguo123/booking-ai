import {
  SectionContainer,
  SectionHeading,
  SectionTitle,
  SectionDescription,
  SectionBody,
} from "@saas-ui/pro";
import { Card, CardBody, Form, FormLayout, Field } from "@saas-ui/react";
import React from "react";

export default function GoogleCalendarIntegrationSettings() {
  return (
    <SectionContainer>
      <SectionHeading mb={4}>
        <SectionTitle>Your Integrations</SectionTitle>
        <SectionDescription>
          Sections can be fully composed to give you full control.
        </SectionDescription>
      </SectionHeading>
      <SectionBody>
        {" "}
        <Card>
          <CardBody></CardBody>
        </Card>
      </SectionBody>
    </SectionContainer>
  );
}
