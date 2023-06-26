import { getAppointmentCookie } from "@/lib/api/appointment/helpers";
import selectServices from "@/lib/api/appointment/selectServices";
import logger from "@/lib/logger";
import { GenericAppointmentAPIHandler } from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";

const selectServicesHandler: GenericAppointmentAPIHandler = async (
  req,
  res
) => {
  const {
    method,
    body: { appointmentData, userId },
  } = req;

  switch (method) {
    case "POST":
      // find existing cookie data
      const cookieData = getAppointmentCookie(req);

      logger.child({ appointmentData, userId }).info("[selectServices]");

      const { status, success } = await selectServices(
        appointmentData?.services || [],
        res,
        userId as string,
        cookieData || undefined
      );

      return res.status(status).json({
        success,
        status,
      });

    default:
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        status: StatusCodes.METHOD_NOT_ALLOWED,

        error: {
          message: `Method ${method} Not Allowed`,
        },
      });
  }
};

export default selectServicesHandler;
