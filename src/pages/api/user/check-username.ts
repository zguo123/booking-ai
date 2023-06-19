import validateUsername from "@/lib/api/userOperations/validateUsername";
import { StatusCodes } from "http-status-codes";
import { CheckUsernameHandler } from "../../../typings/user";

const checkUsernameHandler: CheckUsernameHandler = async (req, res) => {
  const {
    method,
    body: { username },
  } = req;

  switch (method) {
    case "POST":
      const { success, status, ...rest } = await validateUsername(username);

      return res.status(status).json({
        success: success,
        status: status,
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

export default checkUsernameHandler;
