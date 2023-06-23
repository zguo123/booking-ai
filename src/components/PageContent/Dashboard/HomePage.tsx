"use client";

import useAppointmentInfo from "@/hooks/useAppointmentInfo";
import { appointmentDataColumns } from "@/lib/consts/appointments";
import { formatPrice } from "@/lib/helpers/appointment";
import { AppointmentItems } from "@/typings/appointments";
import { SettingsIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import {
  CalendarDateTime,
  DateFormatter,
  parseAbsolute,
  parseZonedDateTime,
} from "@internationalized/date";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";

export default function HomePage() {
  const { appointments: appointmentData } = useAppointmentInfo();

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
      data={((appointmentData as AppointmentItems[]) || [])?.map(
        (appointment) => {
          const appointmentDate = parseAbsolute(
            appointment?.appointmentDate.toString(),
            "America/Toronto"
          ).toDate();

          const formattedDate = new DateFormatter("en-CA", {
            timeZone: "America/Toronto",
            dateStyle: "long",
            timeStyle: "short",
            hour12: true,
          }).format(appointmentDate);

          return {
            ...appointment,

            name: `${appointment?.firstName} ${appointment?.lastName}`,
            date: formattedDate,
            totalPrice: formatPrice(appointment.totalPrice),
          };
        }
      )}
    >
      <DataGridPagination />
    </DataGrid>
  );
}
