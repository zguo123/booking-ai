import createService from "@/lib/api/service/createService";
import getServices from "@/lib/api/service/getServices";
import dbConnect from "@/lib/dbConnect";
import { GenericServiceHandler, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

const retrieveAllServices: GenericServiceHandler = async (req, res) => {
  const {
    method,
    query: { userId },
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      const { status, success, error, service } = await getServices(
        userId as string
      );

      return res.status(status).json({
        success,
        status,
        error,
        service,
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

export default retrieveAllServices;
