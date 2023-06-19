"use client";
import OnboardingForm from "@/components/Auth/OnboardingForm";
import useAuthInfo from "@/hooks/useAuthInfo";
import {
  Button,
  Container,
  Heading,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  BackButton,
  PageBody,
  PageContainer,
  PageHeader,
  Toolbar,
} from "@saas-ui/pro";
import { Card, CardBody } from "@saas-ui/react";
import Link from "next/link";

export default function OnboardingPage() {
  const { signOut, authUser: user, isLoading } = useAuthInfo();

  return (
    <PageContainer height="full">
      <PageHeader
        p={0}
        title={
          <Stack spacing={0}>
            <Text size="xs" color="muted">
              Logged in as
            </Text>
            <Skeleton isLoaded={!isLoading}>
              <Text>{user?.email}</Text>
            </Skeleton>
          </Stack>
        }
        nav={<BackButton />}
        toolbar={
          <Toolbar>
            <Button as={Link} href={signOut}>
              Logout
            </Button>
          </Toolbar>
        }
      />
      <PageBody
        px={{
          base: 4,
          lg: 0,
        }}
        mt={"3rem"}
        flex={1}
        contentWidth="container.xl"
      >
        <Stack spacing={6} h="full">
          <Heading size="xl" textAlign="center">
            We're <u>SUPER</u> excited to have you here!
          </Heading>{" "}
          <Text
            fontSize="xl"
            maxW="lg"
            alignSelf="center"
            color="muted"
            textAlign="center"
          >
            Before you can start booking appointments, we need to get a few
            things set up.
          </Text>
          <Card as={Container} maxW="container.md" w="full">
            <CardBody py={8}>
              <OnboardingForm />
            </CardBody>
          </Card>
        </Stack>
      </PageBody>
    </PageContainer>
  );
}
