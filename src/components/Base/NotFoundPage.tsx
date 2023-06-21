"use client";

import { ChevronLeftIcon, WarningIcon } from "@chakra-ui/icons";
import { Heading, Text } from "@chakra-ui/react";
import { ErrorBoundary, ErrorPage } from "@saas-ui/pro";
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "@saas-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <ErrorPage h="100%" suppressHydrationWarning>
      <EmptyStateContainer colorScheme="primary">
        <EmptyStateBody>
          <EmptyStateIcon as={WarningIcon} fontSize="" />

          <EmptyStateTitle>
            <Heading as="h1" size="xl">
              The page you are looking for does not exist.
            </Heading>
          </EmptyStateTitle>
          <EmptyStateDescription>
            <Text fontSize="xl">
              Please check the URL or click the button below to be redirected to
            </Text>
          </EmptyStateDescription>
          <EmptyStateActions size="lg">
            {" "}
            <Button
              onClick={() => {
                router.back();
              }}
              variant="secondary"
              leftIcon={<ChevronLeftIcon />}
            >
              Back
            </Button>
            <Button as={Link} href="/" colorScheme="purple">
              Home
            </Button>
          </EmptyStateActions>
        </EmptyStateBody>
      </EmptyStateContainer>
    </ErrorPage>
  );
}
