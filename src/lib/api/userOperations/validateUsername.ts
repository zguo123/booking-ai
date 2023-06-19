/**
 * YAN HU HAIR
 *
 * Check Username
 *
 * @author Zhaoyu Guo
 */

import dbConnect from "@/lib/dbConnect";
import logger from "@/lib/logger";
import UserModel from "@/models/UserModel";
import { CheckUsername } from "@/typings/user";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

const validateUsername: CheckUsername = async (username) => {
  await dbConnect();

  try {
    // find the user with the same username
    const user = await UserModel.findOne({ username: username });

    // if the user exists, return false
    if (user) {
      return {
        success: false,
        status: StatusCodes.CONFLICT,
        error: {
          message: "Username already exists",
        },
      };
    }

    // do some other checks
    if (username.length < 3) {
    return {
        success: false,
        status: StatusCodes.BAD_REQUEST,
        error: {
          message: "Username must be at least 3 characters long",
        },
      };
    } else if (username.length > 20) {
      return {
        success: false,
        status: StatusCodes.BAD_REQUEST,
        error: {
          message: "Username must be at most 20 characters long",
        },
      };
    } else if (!username.match(/^[a-zA-Z0-9_]+$/)) {
      return {
        success: false,
        status: StatusCodes.BAD_REQUEST,
        error: {
          message: "Username can only contain letters, numbers and underscores",
        },
      };
    }

    // if the user does not exist, return true
    return {
      success: true,
      status: StatusCodes.OK,
    };
  } catch (error) {
    logger.error(`[validateUsername] ${error}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};

export default validateUsername;
