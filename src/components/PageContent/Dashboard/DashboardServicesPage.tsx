"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { sampleServices } from "@/lib/consts/services";
import { formatPrice } from "@/lib/helpers/appointment";
import { useRetrieveServicesQuery } from "@/redux/services/service";
import { ServiceItems } from "@/typings/service";
import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Container,
  IconButton,
  ListItem,
  Stack,
  Text,
  List,
  Card,
  Heading,
  CardBody,
  HStack,
  Tag,
  Button,
  Flex,
  Center,
} from "@chakra-ui/react";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";
import { EmptyState } from "@saas-ui/react";
import { FiUsers } from "react-icons/fi";

export default function DashboardServicesPage() {
  // convert the date to a string

  const { user } = useAuthInfo();

  const { data: services } = useRetrieveServicesQuery(user?._id as string);

  return (
    <>
      <DataGrid
        isHoverable
        isSelectable
        isSortable
        columns={[
          {
            id: "name",
            header: "Service Name",
          },
          {
            id: "duration",
            header: "Service Duration",
            enableSorting: false,
          },
          {
            id: "totalPrice",
            header: "Price",
            enableSorting: false,
          },

          {
            id: "actions",
            header: "More Actions",

            cell: () => <Button leftIcon={<SettingsIcon />}>Manage</Button>,
          },
        ]}
        data={((services?.service as ServiceItems[]) || [])?.map((service) => {
          return {
            ...service,
            totalPrice: formatPrice(service.price),
            duration: `${service.duration} min`,
          };
        })}
      >
        <DataGridPagination />
      </DataGrid>
    </>
  );
}
