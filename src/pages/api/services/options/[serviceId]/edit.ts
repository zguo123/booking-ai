import { isAuthenticated } from "@/lib/api/auth/authentication";
import editService from "@/lib/api/service/editService";
import dbConnect from "@/lib/dbConnect";
import { GenericServiceHandler, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

const editOneServiceHandler: GenericServiceHandler = async (req, res) => {
  const {
    method,
    query: { serviceId, userId },
    body: { serviceData },
  } = req;

  await dbConnect();
  await isAuthenticated(req?.cookies?.token as string);

  switch (method) {
    case "PATCH":
      const { status, success, error } = await editService(
        userId as string,
        serviceId as string,
        serviceData as ServiceRequestBody
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

export default editOneServiceHandler;
