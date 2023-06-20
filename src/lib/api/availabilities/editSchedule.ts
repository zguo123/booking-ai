import { days } from "@/lib/consts/days";
import logger from "@/lib/logger";
import AvailabilityModel from "@/models/AvailabilityModel";
import {
  AvailabilityAPIResponse,
  AvailabilityDate,
  AvailabilityRequestBody,
  WorkingHours,
} from "@/typings/availability";
import {
  getLocalTimeZone,
  parseDate,
  parseTime,
  today,
} from "@internationalized/date";
import { useStepFormContext } from "@saas-ui/react";
import { StatusCodes } from "http-status-codes";
import { formatMonthYear, getMonthAsName } from "@/lib/dateHelpers";

const validateDate = (
  workingHourInfo: Pick<WorkingHours, "from" | "to" | "isClosed">,
  errors: { [key in keyof AvailabilityRequestBody]: string | undefined },
  date: AvailabilityDate
) => {
  // only conduct validation if the date is not closed
  if (!workingHourInfo.isClosed) {
    const parsedTimes = {
      from: parseTime(workingHourInfo.from),
      to: parseTime(workingHourInfo.to),
    };

    logger.child({ parsedTimes }).info("[validateDate] parsedTimes");
    logger.info(
      `[validateDate] comparison ${parsedTimes.to.compare(parsedTimes.from)}`
    );
    // from time must be before to time
    if (parsedTimes.to.compare(parsedTimes.from) < 0) {
      errors[
        date
      ] = `This range is invalid: ${workingHourInfo.from} - ${workingHourInfo.to}`;
    }
  }

  return errors;
};

export default async (
  availabilityData: AvailabilityRequestBody,
  userId: string,
  scheduleId: string
): Promise<AvailabilityAPIResponse> => {
  try {
    // check for valid month and see if the month is already taken
    const currentDate = today(getLocalTimeZone());
    const givenDate = parseDate(`${availabilityData.monthYear}-01`);

    // retrieve the availability data
    const availability = await AvailabilityModel.findOne({
      user: userId,
      _id: scheduleId,
    });

    // check for availability from the user and month
    const availabilityExists = await AvailabilityModel.exists({
      monthYear: availabilityData.monthYear,
      user: userId,
    });

    if (!availability) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: `Availability with that month and year does not exist`,
        },
      };
    }

    let errors: {
      [key in keyof AvailabilityRequestBody]: string | undefined;
    } = {
      monthYear: undefined,
      monday: undefined,
      tuesday: undefined,
      wednesday: undefined,
      thursday: undefined,
      friday: undefined,
      saturday: undefined,
      sunday: undefined,
      includeHolidays: undefined,
    };

    if (availabilityExists) {
      errors.monthYear = `Availability Schedule for ${formatMonthYear(
        availabilityData.monthYear
      )} already exists`;
    }

    // check all the dates
    Object.entries(availabilityData).forEach(([key, value]) => {
      if (!days.includes(key)) {
        return;
      }

      const dayErrors = validateDate(
        value as Pick<WorkingHours, "from" | "to" | "isClosed">,
        errors,
        key as AvailabilityDate
      );

      errors = {
        ...errors,
        ...dayErrors,
      };
    });

    // make sure the given date is not in the past
    if (
      givenDate.compare(currentDate) < 0 &&
      givenDate.month !== currentDate.month
    ) {
      errors.monthYear = "The given month is in the past";
    }

    const doesHaveErrors = Object.values(errors).some((error) => !!error);

    if (!doesHaveErrors) {
      // update the availability
      await AvailabilityModel.findOneAndUpdate(
        { user: userId, _id: scheduleId },
        {
          $set: {
            ...availabilityData,
          },
        },
        {
          new: true,
          upsert: true,
        }
      );
    }

    return {
      success: !doesHaveErrors,
      status: StatusCodes[doesHaveErrors ? "BAD_REQUEST" : "CREATED"],
      error: {
        message: !doesHaveErrors ? "" : errors,
      },
    };
  } catch (err) {
    logger.error(`[addNew -- availabilities] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
