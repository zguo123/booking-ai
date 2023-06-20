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
  useQuery,
} from "@chakra-ui/react";
import { Page, Toolbar } from "@saas-ui/pro";
import { AppShell, Persona } from "@saas-ui/react";
import {
  NavItem,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
} from "@saas-ui/sidebar";
import React, { useEffect, useMemo } from "react";

import useAuthInfo from "@/hooks/useAuthInfo";
import { useFlags } from "flagsmith/react";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { BsClock, BsFillGridFill, BsGear } from "react-icons/bs";
import { FiHome, FiLogOut } from "react-icons/fi";
import FeatureFlag from "./FeatureFlag";
import CreateServiceForm from "../DashboardComponents/CreateServiceForm";
import {
  useLazyRetrieveOneServiceQuery,
  useRetrieveOneServiceQuery,
} from "@/redux/services/service";
import { ServiceItems } from "@/typings/service";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // auth info
  const { user, isLoading, signOut } = useAuthInfo();

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
            <BreadcrumbItem color="muted">
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
            <CreateServiceForm />
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
