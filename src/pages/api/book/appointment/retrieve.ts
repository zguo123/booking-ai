import { getAppointmentCookie } from "@/lib/api/appointment/helpers";
import retrieveAppointment from "@/lib/api/appointment/retrieveAppointment";
import dbConnect from "@/lib/dbConnect";
import logger from "@/lib/logger";
import { GenericAppointmentAPIHandler } from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";

const retrieveAppointmentsHandler: GenericAppointmentAPIHandler = async (
  req,
  res
) => {
  const {
    method,
    query: { appointmentId, userId },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const { status, success, ...rest } = await retrieveAppointment(
        userId as string,
        appointmentId as string
      );

      logger
        .child({
          status,
          success,
          tempAppointmentData: getAppointmentCookie(req),
          ...rest,
        })
        .info("[retrieveAppointment]");

      return res.status(status).json({
        success,
        status,
        tempAppointmentData: getAppointmentCookie(req),
        ...rest,
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

export default retrieveAppointmentsHandler;
