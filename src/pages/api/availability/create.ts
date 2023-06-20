import addNew from "@/lib/api/availabilities/addNew";
import dbConnect from "@/lib/dbConnect";
import { GenericAvailabilityHandler } from "@/typings/availability";
import { StatusCodes } from "http-status-codes";

const createAvailabilityHandler: GenericAvailabilityHandler = async (
  req,
  res
) => {
  const {
    method,
    body: { availabilityData, userId },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const { status, success, ...rest } = await addNew(
        availabilityData,
        userId
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

export default createAvailabilityHandler;
