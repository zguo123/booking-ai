/**
 * YAN HU HAIR
 *
 * Retrieve authenticated user
 *
 * @author Zhaoyu Guo
 */

import { NextApiRequest, NextApiResponse } from "next";

import { GetUserHandlerInfoHandler, UserResponse } from "@/typings/user";

import { StatusCodes } from "http-status-codes";
import dbConnect from "@/lib/dbConnect";
import getUser from "@/lib/api/userOperations/getUser";

const retrieveAuthenticatedUser: GetUserHandlerInfoHandler = async (
  req,
  res
) => {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      const token =
        req?.cookies?.token || req?.headers?.authorization?.substr(7);

      const { success, status, error, ...rest } = await getUser(token);
      return res.status(status).json({
        success,
        status,
        error,
        ...rest,
      });
    default:
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        status: StatusCodes.METHOD_NOT_ALLOWED,
        error: {
          message: `Method ${method} not allowed`,
        },
      });
  }
};

export default retrieveAuthenticatedUser;
