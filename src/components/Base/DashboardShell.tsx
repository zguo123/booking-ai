"use client";

import { IconButton, Spacer } from "@chakra-ui/react";
import { Page } from "@saas-ui/pro";
import { AppShell, Persona } from "@saas-ui/react";
import { NavItem, Sidebar, SidebarSection } from "@saas-ui/sidebar";
import React from "react";

import { SettingsIcon } from "@chakra-ui/icons";
import { usePathname } from "next/navigation";
import { BsClock, BsFillGridFill, BsGear } from "react-icons/bs";
import { FiHome } from "react-icons/fi";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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
    }
  };

  return (
    <AppShell
      sidebar={
        <Sidebar maxW="25% !important">
          <SidebarSection direction="row">
            {" "}
            <Persona size="sm" name="Yan Hair" />
            <Spacer />
            <IconButton
              aria-label="Settings"
              variant="ghost"
              size="md"
              icon={<SettingsIcon />}
            />
          </SidebarSection>
          <SidebarSection gap={2} flex="1" overflowY="auto">
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
      <Page title={renderTitle()} contentWidth="full">
        {children}
      </Page>
    </AppShell>
  );
}
