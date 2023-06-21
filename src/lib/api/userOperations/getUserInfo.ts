/**
 * YAN HU HAIR
 *
 * Get User Info API
 *
 * @author Zhaoyu Guo
 */

import dbConnect from "@/lib/dbConnect";
import AvailabilityModel from "@/models/AvailabilityModel";
import ServiceModel from "@/models/ServiceModel";
import UserModel from "@/models/UserModel";
import { UserResponse } from "@/typings/user";
import { StatusCodes } from "http-status-codes";

export default async (userId: string): Promise<UserResponse> => {
  try {
    await dbConnect();

    const user = await UserModel.findById(userId).lean();

    if (!user) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "User not found",
        },
      };
    }

    // services
    const services = await ServiceModel.find({ user: userId }).lean();

    // schedules
    const availabilitySchedules = await AvailabilityModel.find({
      user: userId,
    }).lean();

    return {
      success: true,
      status: StatusCodes.OK,
      user,
      services,
      availabilitySchedules,
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
