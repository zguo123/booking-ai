/**
 * YAN HU HAIR
 *
 * Get User API
 *
 * @author Zhaoyu Guo
 */

import { isAuthenticated, verifyToken } from "@/lib/api/auth/authentication";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { GetUser, UserResponse } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

const getUser: GetUser = async (token) => {
  try {
    await dbConnect();

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
      }).lean();
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
