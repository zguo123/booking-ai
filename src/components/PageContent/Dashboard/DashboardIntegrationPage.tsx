"use client";
import IntegrationToggle from "@/components/DashboardComponents/IntegrationsComponents/IntegrationToggle";
import { integrations } from "@/lib/consts/integrations";
import { Container, Stack, StackDivider, Text } from "@chakra-ui/react";
import {
  SectionBody,
  SectionContainer,
  SectionDescription,
  SectionHeading,
  SectionTitle,
} from "@saas-ui/pro";

import {
  Card,
  CardBody,
  List
} from "@saas-ui/react";

export default function DashboardIntegrationPage() {
  return (
    <Container maxW="container.xl" py={"1.5rem"}>
      <SectionContainer>
        <SectionHeading mb={4}>
          <SectionTitle>Your Integrations</SectionTitle>
          <SectionDescription>
            <Text>
              We are third-party friendly! We integrate with a variety of tools
              such as Google Calendar, and more. We are always working hard to
              add more integrations to our platform. If you have a suggestion,
              please let us know!
            </Text>
          </SectionDescription>
        </SectionHeading>
        <SectionBody>
          <Card>
            <CardBody py={1}>
              <List>
                <Stack spacing={3} divider={<StackDivider />}>
                  {integrations.map((integration) => (
                    <IntegrationToggle
                      key={integration.name}
                      integration={integration}
                    />
                  ))}
                </Stack>
              </List>
            </CardBody>
          </Card>
        </SectionBody>
      </SectionContainer>
    </Container>
  );
}
