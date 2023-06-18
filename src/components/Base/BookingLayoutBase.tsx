"use client";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { PageBody, PageContainer } from "@saas-ui/pro";
import {
  AppShell,
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
} from "@saas-ui/react";
import {
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  SidebarOverlay,
  NavGroup,
  NavItem,
} from "@saas-ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function BookingLayoutBase({
  children,
  nextBtnProps,
  backBtnProps,
}: {
  children: React.ReactNode;
  nextBtnProps?: ButtonProps;
  backBtnProps?: ButtonProps;
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
      sidebar={
        pathname === "/book/details" ? null : (
          <Sidebar display={pathname === "/book/details" ? "none" : "block"}>
            <SidebarSection></SidebarSection>
          </Sidebar>
        )
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
        <PageBody flex={1}>
          <Container maxW="full" display="flex" minH="full">
            <Flex flex={1}>{children}</Flex>
          </Container>
        </PageBody>{" "}
        <Box
          as="footer"
          display={pathname === "/book/details" ? "none" : "block"}
          borderTopWidth={1}
        >
          <Container maxW="full">
            <ButtonGroup
              py={3}
              size="lg"
              w="full"
              display="flex"
              justifyContent="space-between"
            >
              {pathname !== "/book" && pathname !== "/book/details" && (
                <Button
                  w={{
                    base: "full",
                    lg: "auto",
                  }}
                  variant="secondary"
                  onClick={back}
                  {...backBtnProps}
                >
                  Back
                </Button>
              )}
              {pathname !== "/book/select-date" &&
                pathname !== "/book/contact" &&
                pathname !== "/book/details" && (
                  <Button
                    w={{
                      base: "full",
                      lg: "auto",
                    }}
                    variant="solid"
                    colorScheme="blue"
                    ml="auto"
                    onClick={next}
                    {...nextBtnProps}
                  >
                    Next
                  </Button>
                )}
            </ButtonGroup>
          </Container>
        </Box>
      </PageContainer>
    </AppShell>
  );
}
