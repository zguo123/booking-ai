"use client";

import useBookBaseUrl from "@/hooks/useBookBaseUrl";
import useGetUserInfo from "@/hooks/useGetUserInfo";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  ButtonProps,
  Container,
  Flex,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { PageBody, PageContainer } from "@saas-ui/pro";
import {
  AppShell,
  Loader,
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
} from "@saas-ui/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function BookingLayoutBase({
  children,
  nextBtnProps,
  backBtnProps,
  isLoading,
  nextAction,
}: {
  children: React.ReactNode;
  nextBtnProps?: ButtonProps;
  backBtnProps?: ButtonProps;
  nextAction?: () => void;
  isLoading?: boolean;
}) {
  const pathname = usePathname();

  const bookBase = useBookBaseUrl();

  const router = useRouter();

  // user info
  const { user, isUserLoading } = useGetUserInfo();

  const userData = {
    ...user,
    fullName: `${user?.firstName} ${user?.lastName}`,
  };

  // const next = () => {
  //   switch (pathname) {
  //     case `${bookBase}`:
  //       router?.push(`${bookBase}/select-date`);
  //       break;
  //   }
  // };

  const back = () => {
    switch (pathname) {
      case `${bookBase}/select-date`:
        router?.push(`${bookBase}`);
        break;
      case `${bookBase}/contact`:
        router?.push(`${bookBase}/select-date`);
        break;
    }
  };

  return (
    <AppShell
      variant="fullscreen"
      px={0}
      navbar={
        <Box py={4} as="header" borderBottomWidth={1}>
          <Container maxW="full">
            <Skeleton maxW="13rem" isLoaded={!isUserLoading}>
              <PersonaContainer size="lg">
                <Avatar bg="blue.500" name={userData?.fullName} />
                <PersonaDetails>
                  <PersonaLabel as={Heading} size="lg">
                    {userData?.fullName}
                  </PersonaLabel>
                </PersonaDetails>
              </PersonaContainer>
            </Skeleton>
          </Container>
        </Box>
      }
    >
      <PageContainer>
        {" "}
        <PageBody flex={1}>
          {" "}
          <Loader variant="fullscreen" isLoading={isLoading || false} />
          <Container maxW="full" display="flex" minH="full">
            <Flex flex={1}>{children}</Flex>
          </Container>
        </PageBody>{" "}
        <Box
          as="footer"
          display={pathname === `${bookBase}/details` ? "none" : "block"}
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
              {pathname !== `${bookBase}` &&
                pathname !== `${bookBase}/details` && (
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
              {pathname !== `${bookBase}/select-date` &&
                pathname !== `${bookBase}/contact` &&
                pathname !== `${bookBase}/details` && (
                  <Button
                    w={{
                      base: "full",
                      lg: "auto",
                    }}
                    variant="solid"
                    colorScheme="blue"
                    ml="auto"
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
