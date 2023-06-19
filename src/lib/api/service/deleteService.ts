import logger from "@/lib/logger";
import ServiceModel from "@/models/ServiceModel";
import { ServiceAPIResponse, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export default async (serviceId: string): Promise<ServiceAPIResponse> => {
  try {
    // find service name
    const service = await ServiceModel.findById(serviceId);

    if (!service) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "Service not found",
        },
      };
    }

    await ServiceModel.findByIdAndDelete(serviceId);

    return {
      success: true,
      status: StatusCodes.OK,
    };
  } catch (err) {
    logger.info(`[deleteService] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
