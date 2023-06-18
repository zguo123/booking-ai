"use client";

import {
  appointmentData,
  appointmentDataColumns,
} from "@/lib/consts/appointments";
import { formatPrice } from "@/lib/helpers/appointment";
import { SettingsIcon } from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";
import { FiMoreVertical } from "react-icons/fi";

export default function HomePage() {
  // convert the date to a string

  return (
    <DataGrid
      isHoverable
      isSelectable
      isSortable
      columns={[
        ...appointmentDataColumns,
        {
          id: "actions",
          header: "More Actions",

          cell: () => <Button leftIcon={<SettingsIcon />}>Manage</Button>,
        },
      ]}
      data={appointmentData.map((appointment) => {
        return {
          ...appointment,
          appointmentDate: appointment.appointmentDate.toDateString(),
          totalPrice: formatPrice(appointment.totalPrice),
        };
      })}
    >
      <DataGridPagination />
    </DataGrid>
  );
}
