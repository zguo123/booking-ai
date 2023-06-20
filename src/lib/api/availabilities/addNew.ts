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
import { StatusCodes } from "http-status-codes";

const validateDate = (
  workingHourInfo: Pick<WorkingHours, "from" | "to" | "isClosed">,
  errors: { [key in keyof AvailabilityRequestBody]: string | undefined },
  date: AvailabilityDate
) => {
  const parsedTimes = {
    from: parseTime(workingHourInfo.from),
    to: parseTime(workingHourInfo.to),
  };
  // only conduct validation if the date is not closed
  if (!workingHourInfo.isClosed) {
    // from time must be before to time
    if (parsedTimes.from.compare(parsedTimes.to) < 0) {
      errors[date] = `The from time must be before the to time on ${date}`;
    }
  }

  errors[date] = undefined;
};

export default async (
  availabilityData: AvailabilityRequestBody,
  userId: string
): Promise<AvailabilityAPIResponse> => {
  try {
    // check for valid month and see if the month is already taken
    const currentDate = today(getLocalTimeZone());
    const givenDate = parseDate(`${availabilityData.month}-01`);

    // retrieve the availability data
    const availability = await AvailabilityModel.findOne({
      month: availabilityData.month,
      user: userId,
    });

    const errors: {
      [key in keyof AvailabilityRequestBody]: string | undefined;
    } = {
      month: undefined,
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

      validateDate(
        value as Pick<WorkingHours, "from" | "to" | "isClosed">,
        errors,
        key as AvailabilityDate
      );
    });

    // make sure the given date is not in the past
    if (givenDate.compare(currentDate) < 0) {
      errors.month = "The given month is in the past";
    } else if (availability) {
      errors.month = `You cannot make a new availability schedule for the month of ${availabilityData.month}`;
    }

    const doesHaveErrors = Object.values(errors).some((error) => !!error);

    if (!doesHaveErrors) {
      // create
      await AvailabilityModel.create({
        ...availabilityData,
        user: userId,
        month: `${availabilityData.month.split("-")[0]}}`,
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
