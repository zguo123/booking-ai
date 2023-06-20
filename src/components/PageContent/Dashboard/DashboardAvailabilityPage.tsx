"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { getMonthNameFromNumber } from "@/lib/api/availabilities/helpers";
import { days } from "@/lib/consts/days";
import {
  useDeleteScheduleMutation,
  useRetrieveAllSchedulesQuery,
} from "@/redux/services/availability";
import { AvailabilityItems, WorkingHours } from "@/typings/availability";
import { Box } from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";
import { MenuItem, OverflowMenu, useSnackbar } from "@saas-ui/react";

export default function DashboardAvailabilityPage() {
  const snackbar = useSnackbar();

  // convert the date to a string
  const { user } = useAuthInfo();

  const { data: scheduleData } = useRetrieveAllSchedulesQuery(
    user?._id as string
  );

  const [deleteSchedule] = useDeleteScheduleMutation();

  const handleDeleteSchedule = async (scheduleId: string) => {
    snackbar.promise(deleteSchedule(scheduleId).unwrap(), {
      loading: "Deleting schedule...",
      success: "Schedule deleted",
      error: "Failed to delete schedule",
    });
  };

  return (
    <DataGrid
      isHoverable
      isSortable
      sx={{
        "& tbody tr": {
          cursor: "pointer",
        },
      }}
      getRowId={(row) => {
        return String(row?._id);
      }}
      columns={[
        { id: "month", header: "Schedule Month" },
        { id: "openedDays", header: "Operating Days" },
        {
          id: "actions",
          header: "",
          size: 50,
          cell: (cell) => {
            return (
              <Box onClick={(e) => e.stopPropagation()}>
                <OverflowMenu size="xs">
                  <MenuItem
                    onClick={() => {
                      const { _id } = cell?.row?.original;

                      handleDeleteSchedule(_id as string);
                    }}
                  >
                    Delete
                  </MenuItem>
                </OverflowMenu>
              </Box>
            );
          },
        },
      ]}
      data={((scheduleData?.schedules as AvailabilityItems[]) || [])?.map(
        (schedule) => {
          const currMonthYear = parseDate(`${schedule?.monthYear}-01`);

          const openedDays = Object.keys(schedule || {})
            .filter((key) => {
              if (days.includes(key)) {
                const workingHourInfo = schedule?.[
                  key as keyof AvailabilityItems
                ] as WorkingHours;

                return !workingHourInfo?.isClosed;
              }
            })
            .map((key) => `${key.slice(0, 3).toUpperCase()}`)
            .join(", ");

          return {
            month: `${getMonthNameFromNumber(currMonthYear.month)}, ${
              currMonthYear.year
            }`,
            openedDays,
            ...schedule,
          };
        }
      )}
    >
      <DataGridPagination />
    </DataGrid>
  );
}
