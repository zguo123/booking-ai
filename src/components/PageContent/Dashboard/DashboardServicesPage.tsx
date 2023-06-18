"use client";

import { sampleServices } from "@/lib/consts/services";
import { formatPrice } from "@/lib/helpers/appointment";
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
} from "@chakra-ui/react";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";

export default function DashboardServicesPage() {
  // convert the date to a string

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
        data={sampleServices.map((service) => {
          return {
            ...service,
            totalPrice: formatPrice(service.price),
            duration: `${service.duration} min`,
          };
        })}
      >
        <DataGridPagination />
      </DataGrid>
      {/* <List p={4} as={Stack} spacing={2}>
        {sampleServices.map((service) => (
          <ListItem as={Card} p={0} key={service.id}>
            <CardBody p={3} as={HStack} justifyContent="space-between">
              <Stack spacing={1}>
                <Tag size="sm" w="fit-content" colorScheme="primary">
                  {service.name}
                </Tag>

                <Text fontSize="sm" color="muted">
                  {service.description || "No description"}
                </Text>
              </Stack>
              <HStack spacing={4}>
                <Stack spacing={0}>
                  <Text fontSize="xl" fontWeight="bold" textAlign="right">
                    {formatPrice(service.price)}
                  </Text>
                  <Text fontSize="sm" color="muted" textAlign="right">
                    {service.duration} min
                  </Text>
                </Stack>
                <HStack spacing={2}>
                  <IconButton
                    size="lg"
                    aria-label="Edit service"
                    icon={<EditIcon />}
                  />{" "}
                  <IconButton
                    size="lg"
                    colorScheme="red"
                    aria-label="Delete service"
                    icon={<DeleteIcon />}
                  />
                </HStack>
              </HStack>
            </CardBody>
          </ListItem>
        ))}
      </List> */}
    </>
  );
}
