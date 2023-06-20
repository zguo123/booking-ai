"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { formatPrice } from "@/lib/helpers/appointment";
import {
  useDeleteServiceMutation,
  useRetrieveServicesQuery,
} from "@/redux/services/service";
import { ServiceItems } from "@/typings/service";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";
import { MenuItem, OverflowMenu, useSnackbar } from "@saas-ui/react";
import { useCallback, useState } from "react";
import { BulkActions } from "@saas-ui/pro";
import { Button } from "@chakra-ui/react";

export default function DashboardServicesPage() {
  const snackbar = useSnackbar();

  const { user } = useAuthInfo();

  const { data: services } = useRetrieveServicesQuery(user?._id as string);

  const [deleteService] = useDeleteServiceMutation();

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const deleteServices = (serviceId: string, name: string) => {
    snackbar.promise(deleteService(serviceId).unwrap(), {
      loading: `Deleting ${name}...`,
      success: `${name} deleted!`,
      error: `Failed to delete ${name}`,
    });
  };

  const onSelectedServicesChange = useCallback((rows: string[]) => {
    const serviceRows = rows.map((row) => {
      const serviceItems = services?.service as ServiceItems[];
      return serviceItems?.[Number(row)]._id as string;
    });

    setSelectedServices(serviceRows);
  }, []);

  return (
    <>
      <DataGrid
        isHoverable
        isSortable
        onSelectedRowsChange={onSelectedServicesChange}
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
            header: "",
            size: 50,
            cell: (cell) => {
              return (
                <OverflowMenu size="xs">
                  <MenuItem
                    onClick={() => {
                      const { _id, name } = cell?.row?.original;

                      deleteServices(_id as string, name);
                    }}
                  >
                    Delete
                  </MenuItem>
                </OverflowMenu>
              );
            },
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
      </DataGrid>{" "}
      <BulkActions
        selections={selectedServices}
        pos="absolute"
        colorScheme="gray"
        top="0"
        _dark={{
          bg: "gray.700",
        }}
        actions={
          <>
            <Button onClick={() => setSelectedServices([])}>Delete</Button>
          </>
        }
        motionPreset="slideOutBottom"
      />
    </>
  );
}
