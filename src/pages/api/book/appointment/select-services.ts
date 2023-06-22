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
    body: { appointmentData },
  } = req;

  switch (method) {
    case "POST":
      // find existing cookie data
      const cookieData = getAppointmentCookie(req);

      const { status, success } = await selectServices(
        appointmentData?.services || [],
        res,
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
