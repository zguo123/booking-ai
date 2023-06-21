import searchByUsername from "@/lib/api/userOperations/searchByUsername";
import { SearchUserByUsernameHandler } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

const searchUserByUsernameHandler: SearchUserByUsernameHandler = async (
  req,
  res
) => {
  const {
    method,
    query: { query },
  } = req;

  switch (method) {
    case "GET":
      const { status, success, ...rest } = await searchByUsername(query);

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

export default searchUserByUsernameHandler;
