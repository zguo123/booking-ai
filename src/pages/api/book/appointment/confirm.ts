import bookAppointment from "@/lib/api/appointment/bookAppointment";
import { getAppointmentCookie } from "@/lib/api/appointment/helpers";
import dbConnect from "@/lib/dbConnect";
import {
  ContactInfo,
  GenericAppointmentAPIHandler
} from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";

const selectDateTimeHandler: GenericAppointmentAPIHandler = async (
  req,
  res
) => {
  const {
    method,
    body: { appointmentData, userId },
  } = req;

  await dbConnect();

  
  switch (method) {
    case "POST":
      // find existing cookie data
      const cookieData = getAppointmentCookie(req);

      const contactData: ContactInfo = {
        firstName: appointmentData?.firstName,
        lastName: appointmentData?.lastName,
        email: appointmentData?.email,
        phone: appointmentData?.phone,
        appointmentNotes: appointmentData?.appointmentNotes,
      };

      const { status, success, ...rest } = await bookAppointment(
        contactData,
        res,
        userId as string,
        cookieData || undefined
      );

      return res.status(status).json({
        success,
        status,
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

export default selectDateTimeHandler;
