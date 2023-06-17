"use client";

import {
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Page, DataGrid, DataGridPagination } from "@saas-ui/pro";
import { AppShell, PersonaAvatar } from "@saas-ui/react";
import React from "react";
import {
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  SidebarOverlay,
  NavGroup,
  NavItem,
} from "@saas-ui/sidebar";

import { FiHome, FiUsers } from "react-icons/fi";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      h="100vh"
      sidebar={
        <Sidebar width="30%">
          <SidebarSection direction="row">
            <Spacer />
            <Menu>
              <MenuButton
                as={IconButton}
                icon={
                  <PersonaAvatar
                    presence="online"
                    size="xs"
                    src="/showcase-avatar.jpg"
                  />
                }
                variant="ghost"
              />
              <MenuList>
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </SidebarSection>
          <SidebarSection flex="1" overflowY="auto">
            <NavItem icon={<FiHome />}>Home</NavItem>
            <NavItem icon={<FiUsers />}>Contacts</NavItem>
          </SidebarSection>
        </Sidebar>
      }
    >
      <Page title="Page" contentWidth="full">
        {children}
      </Page>
    </AppShell>
  );
}
