"use client";

import { TimeIcon } from "@chakra-ui/icons";
import {
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  HStack,
  ButtonGroup,
  Button,
  Box,
  Heading,
  Avatar,
  AvatarBadge,
  Container,
} from "@chakra-ui/react";
import { Page, PageBody, PageContainer, PageHeader } from "@saas-ui/pro";
import {
  AppShell,
  Persona,
  PersonaAvatar,
  PersonaContainer,
  PersonaDetails,
  PersonaLabel,
  PersonaSecondaryLabel,
  PersonaTertiaryLabel,
} from "@saas-ui/react";
import { Sidebar, SidebarSection, NavItem } from "@saas-ui/sidebar";
import React from "react";
import { FiHome, FiUsers } from "react-icons/fi";

export default function BookingLayoutBase({
  children,
}: {
  children: React.ReactNode;
}) {
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
              justifyContent={{
                base: "flex-start",
                md: "flex-end",
              }}
              w="full"
            >
              <Button
                w={{
                  base: "full",
                  lg: "auto",
                }}
                variant="secondary"
              >
                Back
              </Button>
              <Button
                w={{
                  base: "full",
                  lg: "auto",
                }}
                variant="solid"
                colorScheme="blue"
              >
                Next
              </Button>{" "}
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
