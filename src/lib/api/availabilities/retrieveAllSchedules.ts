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

export default async (userId: string): Promise<AvailabilityAPIResponse> => {
  try {
    return {
      success: true,
      status: StatusCodes.OK,
      availability: await AvailabilityModel.find({ user: userId }).lean(),
    };

    // check all the dates
  } catch (err) {
    logger.error(`[retrieveAllSchedules -- availabilities] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
