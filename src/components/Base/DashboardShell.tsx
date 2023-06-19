"use client";

import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Spacer,
  Skeleton,
  Icon,
} from "@chakra-ui/react";
import { Page, Toolbar } from "@saas-ui/pro";
import { AppShell, Persona } from "@saas-ui/react";
import {
  NavItem,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
} from "@saas-ui/sidebar";
import React from "react";

import { SettingsIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { BsClock, BsFillGridFill, BsGear } from "react-icons/bs";
import { FiHome, FiLogOut } from "react-icons/fi";
import useAuthInfo from "@/hooks/useAuthInfo";
import Link from "next/link";
import { useFlags, useFlagsmith } from "flagsmith/react";
import FeatureFlag from "./FeatureFlag";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // auth info
  const { user, isLoading, signOut } = useAuthInfo();

  const pathname = usePathname();

  const flags = useFlags(["add_service"]); // only causes re-render if specified flag values / traits change

  const renderTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Your Appointments";
      case "/dashboard/services":
        return "Your Services";
      case "/dashboard/availability":
        return "Your Availability";
      case "/dashboard/integrations":
        return "Your Integrations";
    }
  };

  const moreActions = () => {
    switch (pathname) {
      case "/dashboard":
        return <></>;
      case "/dashboard/services":
        return (
          <>
            <FeatureFlag feature="add_service">
              <Button variant="solid" colorScheme="primary">
                Add Service
              </Button>
            </FeatureFlag>
          </>
        );
    }
  };

  return (
    <AppShell
      sidebar={
        <Sidebar maxW="25% !important">
          <SidebarToggleButton />

          <SidebarSection direction="row">
            <Skeleton isLoaded={!isLoading}>
              <Menu>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  textAlign="left"
                  py="2"
                  height="auto"
                >
                  {" "}
                  <Persona
                    size="sm"
                    name={`${user?.firstName} ${user?.lastName}`}
                    secondaryLabel={user?.email}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={Link}
                    href={signOut}
                    icon={<Icon as={FiLogOut} />}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Skeleton>
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto">
            <NavItem
              size="md"
              icon={<FiHome />}
              href="/dashboard"
              aria-current={pathname === "/dashboard" ? "page" : undefined}
              isActive={pathname === "/dashboard"}
            >
              Home
            </NavItem>{" "}
            <NavItem
              size="md"
              icon={<BsGear />}
              aria-current={
                pathname === "/dashboard/services" ? "page" : undefined
              }
              isActive={pathname === "/dashboard/services"}
              href="/dashboard/services"
            >
              Services
            </NavItem>{" "}
            <NavItem
              size="md"
              icon={<BsClock />}
              aria-current={
                pathname === "/dashboard/availability" ? "page" : undefined
              }
              isActive={pathname === "/dashboard/availability"}
              href="/dashboard/availability"
            >
              Availability
            </NavItem>{" "}
            <NavItem
              size="md"
              icon={<BsFillGridFill />}
              aria-current={
                pathname === "/dashboard/integrations" ? "page" : undefined
              }
              isActive={pathname === "/dashboard/integrations"}
              href="/dashboard/integrations"
            >
              Integrations
            </NavItem>{" "}
          </SidebarSection>
        </Sidebar>
      }
    >
      <Page
        title={renderTitle()}
        contentWidth="full"
        toolbar={<Toolbar>{moreActions()}</Toolbar>}
      >
        {children}
      </Page>
    </AppShell>
  );
}
