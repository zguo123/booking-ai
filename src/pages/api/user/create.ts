/**
 * YAN HU HAIR
 *
 * Create user API handler
 *
 * @author Zhaoyu Guo
 */

import createUser from "@/lib/api/user/userOperations/createUser";
import { CreateUserHandler } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

const createUserHandler: CreateUserHandler = async (req, res) => {
  const {
    body: { user: userData },
    method,
  } = req;

  switch (method) {
    case "POST":
      const { status, success, error, user } = await createUser(userData);

      return res.status(status).json({
        success,
        status,
        error,
        user,
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

export default createUserHandler;
