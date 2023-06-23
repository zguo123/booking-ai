import AppointmentModel from "@/models/AppointmentModel";
import { AppointmentResponse } from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";
import { getAppointmentCookie } from "./helpers";

export default async (
  userId: string,
  appointmentId?: string
): Promise<AppointmentResponse> => {
  try {
    const appointment = appointmentId
      ? await AppointmentModel.findOne({
          _id: appointmentId,
          user: userId,
        })
      : await AppointmentModel.find({ user: userId });

    if (!appointment) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "Appointment not found",
        },
      };
    }

    return {
      success: true,
      status: StatusCodes.OK,
      appointments: !appointmentId
        ? await AppointmentModel.find({
            user: userId,
          }).lean()
        : undefined,
      appointment: appointmentId
        ? await AppointmentModel.findOne({
            _id: appointmentId,
            user: userId,
          })
        : undefined,
    };
  } catch (err) {
    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Something went wrong",
      },
    };
  }
};
