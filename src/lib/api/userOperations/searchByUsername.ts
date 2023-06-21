import logger from "@/lib/logger";
import UserModel from "@/models/UserModel";
import { StatusCodes } from "http-status-codes";

export default async (query: string) => {
  try {
    // search the database for a username that contains the query
    const users = await UserModel.find({
      username: { $regex: query, $options: "i" },
    });

    // if there are no users, return false
    if (users.length === 0) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "No users found",
        },
      };
    }

    // if there are users, return true
    return {
      success: true,
      status: StatusCodes.OK,
      users: users,
    };
  } catch (err) {
    logger.info(`[searchByUsername] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
