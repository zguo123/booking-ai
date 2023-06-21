import logger from "@/lib/logger";
import UserModel from "@/models/UserModel";
import { UserResponse } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

export default async (query: string): Promise<UserResponse> => {
  try {
    // search the database for a username that contains the query
    const users = await UserModel.find({
      username: { $regex: query || "", $options: "i" },
    })
      .lean()
      .exec();

    logger.child({ users }).info("[searchByUsername]");

    logger.info(`[searchByUsername] ${users.length} users found with ${query}`);

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
      users: [],
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
