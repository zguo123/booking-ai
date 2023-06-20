"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { getMonthNameFromNumber } from "@/lib/api/availabilities/helpers";
import { days } from "@/lib/consts/days";
import { useRetrieveAllSchedulesQuery } from "@/redux/services/availability";
import { AvailabilityItems, WorkingHours } from "@/typings/availability";
import { SettingsIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { parseDate } from "@internationalized/date";
import { DataGrid, DataGridPagination } from "@saas-ui/pro";

export default function DashboardAvailabilityPage() {
  // convert the date to a string
  const { user } = useAuthInfo();

  const { data: scheduleData } = useRetrieveAllSchedulesQuery(
    user?._id as string
  );

  return (
    <DataGrid
      isHoverable
      isSortable
      columns={[
        { id: "month", header: "Schedule Month" },
        { id: "openedDays", header: "Operating Days" },
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

          console.log();

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
