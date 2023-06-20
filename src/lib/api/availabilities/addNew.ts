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
import { getMonthAsName } from "@/lib/dateHelpers";

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
  userId: string
): Promise<AvailabilityAPIResponse> => {
  try {
    // check for valid month and see if the month is already taken
    const currentDate = today(getLocalTimeZone());
    const givenDate = parseDate(`${availabilityData.monthYear}-01`);

    // retrieve the availability data
    const availability = await AvailabilityModel.findOne({
      monthYear: availabilityData.monthYear,
      user: userId,
    });

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
    } else if (availability) {
      errors.monthYear = `You cannot make a new availability schedule for the month of ${
        getMonthAsName(`${availabilityData.monthYear}-01`) || ""
      }, ${
        availabilityData.monthYear.split("-")[0]
      } because you already have one`;
    }

    const doesHaveErrors = Object.values(errors).some((error) => !!error);

    if (!doesHaveErrors) {
      // create
      await AvailabilityModel.create({
        ...availabilityData,
        user: userId,
        monthYear: `${availabilityData.monthYear}`,
      });
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
