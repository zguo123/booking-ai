import logger from "@/lib/logger";
import {
  AppointmentCookieData,
  AppointmentResponse,
} from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import { setAppointmentCookie } from "./helpers";
import ServiceModel from "@/models/ServiceModel";

export default async (
  servicesList: string[],
  res: NextApiResponse<AppointmentResponse>,
  userId: string,
  cookieData?: AppointmentCookieData
): Promise<AppointmentResponse> => {
  try {
    const durations = await Promise.all(
      (servicesList as string[]).map(async (service) => {
        // find service
        const serviceData = await ServiceModel.findOne({
          name: service,
          user: userId,
        });

        return serviceData?.duration;
      })
    );

    const totalDuration = durations.reduce(
      (a, b) => (a as number) + (b as number),
      0 as number
    );

    setAppointmentCookie(res, {
      ...cookieData,
      services: servicesList,
      totalDuration,
    });

    return {
      success: true,
      status: StatusCodes.OK,
    };
  } catch (err) {
    logger.info(`[selectServices] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
