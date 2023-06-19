import deleteService from "@/lib/api/service/deleteService";
import dbConnect from "@/lib/dbConnect";
import { GenericServiceHandler } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

const deleteServiceHandler: GenericServiceHandler = async (req, res) => {
  const {
    method,
    query: { serviceId },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const { status, success, error } = await deleteService(
        serviceId as string
      );

      return res.status(status).json({
        success,
        status,
        error,
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

export default deleteServiceHandler;
