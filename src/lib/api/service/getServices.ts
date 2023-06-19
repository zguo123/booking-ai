import logger from "@/lib/logger";
import ServiceModel from "@/models/ServiceModel";
import { ServiceAPIResponse, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export default async (userId: string): Promise<ServiceAPIResponse> => {
  try {
    return {
      service: await ServiceModel.find({ user: userId }).lean(),
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
