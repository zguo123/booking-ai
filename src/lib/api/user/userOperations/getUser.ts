/**
 * YAN HU HAIR
 *
 * Get User API
 *
 * @author Zhaoyu Guo
 */

import UserModel from "@/models/UserModal";
import { GetUser, UserResponse } from "@/typings/user";
import { StatusCodes } from "http-status-codes";
import { isAuthenticated, verifyToken } from "../auth/authentication";

const getUser: GetUser = async (token) => {
  try {
    if (!isAuthenticated(token)) {
      return {
        success: false,
        status: StatusCodes.UNAUTHORIZED,
        error: {
          message: "User is not authenticated",
        },
      };
    }

    // user
    let user: UserResponse["user"] = null;

    // verify token
    const tokenUser: any = await verifyToken(token);

    if (tokenUser) {
      user = await UserModel.findOne({
        email: tokenUser.email,
      });
    }

    return {
      success: true,
      status: StatusCodes.OK,
      user,
      authUser: tokenUser,
    };
  } catch (error: any) {
    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: error?.message,
      },
    };
  }
};

export default getUser;
