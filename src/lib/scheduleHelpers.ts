import {
  AvailabilityDate,
  AvailabilityItems,
  AvailabilityRequestBody,
  WorkingHours,
} from "@/typings/availability";
import { days } from "./consts/days";

export const sanitizeSchedule = (
  schedule: AvailabilityRequestBody | AvailabilityItems
) => {
  const dateData = Object.entries(schedule).reduce((acc, [key, value]) => {
    const hours = value as WorkingHours;

    if (days.includes(key as AvailabilityDate)) {
      acc[key as AvailabilityDate] = {
        from: hours.from,
        to: hours.to,
        isClosed: !Boolean(hours.isClosed),
      };
    }
    return acc;
  }, {} as { [key in AvailabilityDate]: WorkingHours });

  return {
    ...schedule,
    ...dateData,
  };
};
