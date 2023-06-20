"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import {
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import { ErrorBoundary } from "@saas-ui/react";
import {} from "@saas-ui/onboarding";
import { PageSidebar } from "@saas-ui/pro";
export type ViewServicePageProps = {
  serviceId: string;
};

export default function ViewServicePage({ serviceId }: ViewServicePageProps) {
  const { user } = useAuthInfo();

  return (
    <>
      <Tabs
        variant="line"
        isLazy
        flex="1"
        minH="0"
        display="flex"
        flexDirection="column"
        size="md"
      >
        <TabList borderBottomWidth="1px">
          <Tab borderTopRadius="md">Activity</Tab>
        </TabList>
      </Tabs>
    </>
  );
}
