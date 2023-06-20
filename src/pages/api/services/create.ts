import { isAuthenticated } from "@/lib/api/auth/authentication";
import createService from "@/lib/api/service/createService";
import dbConnect from "@/lib/dbConnect";
import { GenericServiceHandler, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

const createServiceHandler: GenericServiceHandler = async (req, res) => {
  const {
    method,
    body: { serviceData, userId },
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
    case "POST":
      const { status, success, error } = await createService(
        serviceData as ServiceRequestBody,
        userId
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

export default createServiceHandler;
