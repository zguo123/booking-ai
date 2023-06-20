import logger from "@/lib/logger";
import ServiceModel from "@/models/ServiceModel";
import { ServiceAPIResponse, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";

export default async (
  userId: string,
  serviceId: string,
  serviceData: ServiceRequestBody
): Promise<ServiceAPIResponse> => {
  try {
    const newService = await ServiceModel.findOneAndUpdate(
      { user: userId, _id: serviceId },
      {
        $set: {
          name: serviceData.name,
          price: serviceData.price,
          duration: serviceData.duration,
          description: serviceData.description,
        },
      },
      { upsert: true, new: true }
    );

    if (!newService) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "Service not found",
        },
      };
    }

    return {
      service: newService,
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
