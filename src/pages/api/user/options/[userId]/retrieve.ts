import getUserInfo from "@/lib/api/userOperations/getUserInfo";
import { GenericUserHandler } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

const getUserInfoHandler: GenericUserHandler = async (req, res) => {
  const {
    method,
    query: { userId },
  } = req;

  switch (method) {
    case "GET":
      const { status, success, ...rest } = await getUserInfo(userId as string);

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

export default getUserInfoHandler;
