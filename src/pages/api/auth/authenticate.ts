/**
 * YAN HU HAIR
 *
 * Authenticate user
 *
 * @author Zhaoyu Guo
 */

import { authenticate } from "@/lib/api/auth/authentication";
import { AuthenticateUserHandler } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

const authenticateUser: AuthenticateUserHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      const didToken = req?.headers?.authorization?.substr(7);

      const { success, error, status, user } = await authenticate(
        didToken,
        res
      );

      return res.status(status).json({
        success,
        status,
        error,
        user,
      });

    default:
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        success: false,
        status: StatusCodes.NOT_ACCEPTABLE,
        error: { message: `${method} is not allowed` },
      });
  }
};

export default authenticateUser;
