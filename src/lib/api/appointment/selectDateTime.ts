import logger from "@/lib/logger";
import {
  AppointmentCookieData,
  AppointmentResponse,
} from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import { setAppointmentCookie } from "./helpers";

export default async (
  appointmentDate: Date,
  res: NextApiResponse<AppointmentResponse>,
  cookieData?: AppointmentCookieData
): Promise<AppointmentResponse> => {
  try {

    setAppointmentCookie(res, {
      ...cookieData,
      appointmentDate,
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
