import logger from "@/lib/logger";
import ServiceModel from "@/models/ServiceModel";
import { ServiceAPIResponse } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

export default async (
  userId: string,
  serviceId?: string
): Promise<ServiceAPIResponse> => {
  try {
    let service = null;

    if (serviceId) {
      service = await ServiceModel.findOne({
        user: userId,
        _id: serviceId,
      }).lean();
    } else {
      service = await ServiceModel.find({ user: userId }).lean();
    }

    if (!service) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "Service not found",
        },
      };
    }

    return {
      service: !serviceId
        ? await ServiceModel.find({ user: userId }).lean()
        : await ServiceModel.findOne({ user: userId, _id: serviceId }).lean(),
      success: true,
      status: StatusCodes.OK,
    };
  } catch (err) {
    logger.info(`[createService] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
