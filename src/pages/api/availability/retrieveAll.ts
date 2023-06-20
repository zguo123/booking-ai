import retrieveAllSchedules from "@/lib/api/availabilities/retrieveAllSchedules";
import dbConnect from "@/lib/dbConnect";
import { GenericAvailabilityHandler } from "@/typings/availability";
import { StatusCodes } from "http-status-codes";

const retrieveAllSchedulesHandler: GenericAvailabilityHandler = async (
  req,
  res
) => {
  const {
    method,
    query: { userId },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const { status, success, ...rest } = await retrieveAllSchedules(userId);

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

export default retrieveAllSchedulesHandler;
