import { isAuthenticated } from "@/lib/api/auth/authentication";
import retrieveOneSchedule from "@/lib/api/availabilities/retrieveOneSchedule";
import dbConnect from "@/lib/dbConnect";
import { GenericAvailabilityHandler } from "@/typings/availability";
import { StatusCodes } from "http-status-codes";

const retrieveOneScheduleHandler: GenericAvailabilityHandler = async (
  req,
  res
) => {
  const {
    method,
    query: { scheduleId, userId },
  } = req;

  await dbConnect();

  if (!isAuthenticated(req?.cookies?.token as string)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      status: StatusCodes.UNAUTHORIZED,
      error: {
        message: "User not authenticated",
      },
    });
  }

  switch (method) {
    case "GET":
      const { status, success, ...rest } = await retrieveOneSchedule(
        userId,
        scheduleId
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
          message: `${method} not allowed`,
        },
      });
  }
};

export default retrieveOneScheduleHandler;
