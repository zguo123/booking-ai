"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
} from "@chakra-ui/react";
import { PageBody, PageContainer } from "@saas-ui/pro";
import {
  AppShell,
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
  registerFieldType,
} from "@saas-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function BookingLayoutBase({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const router = useRouter();

  const next = () => {
    switch (pathname) {
      case "/book":
        router?.push("/book/select-date");
        break;
    }
  };

  const back = () => {
    switch (pathname) {
      case "/book/select-date":
        router?.push("/book");
        break;
      case "/book/contact":
        router?.push("/book/select-date");
        break;
    }
  };

  return (
    <AppShell
      variant="fullscreen"
      px={0}
      footer={
        <Box as="footer" borderTopWidth={1}>
          <Container maxW="full">
            <ButtonGroup
              py={5}
              size="lg"
              w="full"
              display="flex"
              justifyContent="space-between"
            >
              {pathname !== "/book" && (
                <Button
                  w={{
                    base: "full",
                    lg: "auto",
                  }}
                  variant="secondary"
                  onClick={back}
                >
                  Back
                </Button>
              )}
              {pathname !== "/book/select-date" &&
                pathname !== "/book/contact" && (
                  <Button
                    w={{
                      base: "full",
                      lg: "auto",
                    }}
                    variant="solid"
                    colorScheme="blue"
                    ml="auto"
                    onClick={next}
                  >
                    {pathname === "/book/contact" ? "Confirm & Finish" : "Next"}
                  </Button>
                )}
            </ButtonGroup>
          </Container>
        </Box>
      }
      navbar={
        <Box py={4} as="header" borderBottomWidth={1}>
          <Container maxW="full">
            <PersonaContainer size="md">
              <Avatar bg="blue.500" name={"yan Hu"} />
              <PersonaDetails>
                <PersonaLabel as={Heading} size="lg">
                  Yan Hu Hair
                </PersonaLabel>
              </PersonaDetails>
            </PersonaContainer>
          </Container>
        </Box>
      }
    >
      <PageContainer>
        <PageBody>
          <Container maxW="full">{children}</Container>
        </PageBody>
      </PageContainer>
    </AppShell>
  );
}
