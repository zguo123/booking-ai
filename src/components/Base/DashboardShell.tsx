"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Page, Toolbar, ToolbarProps } from "@saas-ui/pro";
import { AppShell, Persona } from "@saas-ui/react";
import {
  NavItem,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
} from "@saas-ui/sidebar";
import React, { useEffect } from "react";

import useAuthInfo from "@/hooks/useAuthInfo";
import { useLazyRetrieveOneServiceQuery } from "@/redux/services/service";
import { ServiceItems } from "@/typings/service";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { BsClock, BsFillGridFill, BsGear } from "react-icons/bs";
import { FiHome, FiLogOut } from "react-icons/fi";
import AddAvailabilityForm from "../DashboardComponents/AddAvailabilityForm";
import CreateServiceForm from "../DashboardComponents/CreateServiceForm";
import FeatureFlag from "./FeatureFlag";

export type DashboardShellProps = {
  children: React.ReactNode;
  additionalActions?: {
    pathname: string;
    items: React.ReactNode;
  };
};

export default function DashboardShell({
  children,
  additionalActions,
}: DashboardShellProps) {
  // auth info
  const { user, isLoading, signOut } = useAuthInfo();

  const router = useRouter();

  // params
  const params = useParams();

  // service info
  const [
    retrieveService,
    { data: serviceData, isLoading: isSurveyLoading },
  ] = useLazyRetrieveOneServiceQuery({
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (params?.serviceId && user?._id) {
      retrieveService(
        {
          serviceId: params?.serviceId as string,
          userId: user?._id as string,
        },
        true
      ).unwrap();
    }
  }, [params?.serviceId, user]);

  const pathname = usePathname();

  const renderTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Your Appointments";
      case "/dashboard/services":
        return "Your Services";
      case `/dashboard/services/${params?.serviceId}`:
        return (
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/dashboard/services">Services</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Text>Details</Text>
            </BreadcrumbItem>
            <BreadcrumbItem color="muted" isCurrentPage>
              {" "}
              <SkeletonText
                width="20"
                isLoaded={
                  !!(serviceData?.service as ServiceItems)?.name &&
                  !isSurveyLoading &&
                  (serviceData?.service as ServiceItems)?._id ===
                    params?.serviceId
                }
                noOfLines={1}
              >
                <Text>{(serviceData?.service as ServiceItems)?.name}</Text>{" "}
              </SkeletonText>
            </BreadcrumbItem>
          </Breadcrumb>
        );
      case "/dashboard/availability":
        return "Your Availability";
      case "/dashboard/availability/new":
        return (
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/dashboard/availability">Availability</Link>
            </BreadcrumbItem>

            <BreadcrumbItem color="muted" isCurrentPage>
              {" "}
              <Text>New Availability</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        );

      case "/dashboard/integrations":
        return "Your Integrations";
    }
  };

  const moreActions = () => {
    switch (pathname) {
      case "/dashboard":
        return <></>;
      case "/dashboard/services":
        return <CreateServiceForm />;
      case "/dashboard/availability":
        return (
          <FeatureFlag feature="add_availability">
            <Button
              onClick={() => router.push("/dashboard/availability/new")}
              variant="solid"
              colorScheme="primary"
            >
              Add Availability
            </Button>
          </FeatureFlag>
        );
      case additionalActions?.pathname:
        return additionalActions?.items;
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
                pathname?.includes("/dashboard/services") ? "page" : undefined
              }
              isActive={pathname?.includes("/dashboard/services")}
              href="/dashboard/services"
            >
              Services
            </NavItem>{" "}
            <NavItem
              size="md"
              icon={<BsClock />}
              aria-current={
                pathname?.includes("/dashboard/availability")
                  ? "page"
                  : undefined
              }
              isActive={pathname?.includes("/dashboard/availability")}
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
        position="relative"
        contentWidth="full"
        toolbar={<Toolbar>{moreActions()}</Toolbar>}
        isLoading={isLoading || isSurveyLoading}
      >
        {children}
      </Page>
    </AppShell>
  );
}
