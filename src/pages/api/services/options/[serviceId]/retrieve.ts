import { isAuthenticated } from "@/lib/api/auth/authentication";
import getServices from "@/lib/api/service/getServices";
import dbConnect from "@/lib/dbConnect";
import { GenericServiceHandler } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

const retrieveOneService: GenericServiceHandler = async (req, res) => {
  const {
    method,
    query: { serviceId, userId },
  } = req;

  await dbConnect();
  await isAuthenticated(req?.cookies?.token as string);

  switch (method) {
    case "GET":
      const { status, success, ...rest } = await getServices(
        userId as string,
        serviceId as string
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

export default retrieveOneService;
