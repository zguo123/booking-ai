/**
 * YAN HU HAIR
 *
 * Create User Operation
 *
 * @author Zhaoyu Guo
 */

import UserModel from "@/models/UserModel";
import { CreateUser } from "@/typings/user";
import { StatusCodes } from "http-status-codes";
import { errorHandler } from "../errorHandler";

const createUser: CreateUser = async (user) => {
  try {
    const newUser = await UserModel.create(user);

    return {
      success: true,
      status: StatusCodes.CREATED,
      user: newUser.toObject(),
    };
  } catch (error: any) {
    const errors = await errorHandler(error?.message, error?.code);

    return {
      success: false,
      status: StatusCodes[errors ? "BAD_REQUEST" : "INTERNAL_SERVER_ERROR"],
      error: {
        message: errors || error?.message,
      },
    };
  }
};

export default createUser;
