import logger from "@/lib/logger";
import AvailabilityModel from "@/models/AvailabilityModel";
import { AvailabilityAPIResponse } from "@/typings/availability";
import { StatusCodes } from "http-status-codes";

export default async (
  userId: string,
  scheduleId: string
): Promise<AvailabilityAPIResponse> => {
  try {
    const schedule = await AvailabilityModel.findOne({
      user: userId,
      _id: scheduleId,
    }).lean();

    if (!schedule) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "Schedule not found",
        },
      };
    }

    return {
      success: true,
      status: StatusCodes.OK,
      schedules: schedule,
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
