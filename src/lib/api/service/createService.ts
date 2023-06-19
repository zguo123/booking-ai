import logger from "@/lib/logger";
import ServiceModel from "@/models/ServiceModel";
import { ServiceAPIResponse, ServiceRequestBody } from "@/typings/service";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

export default async (
  serviceData: ServiceRequestBody,
  userId: string
): Promise<ServiceAPIResponse> => {
  try {
    // find service name
    const service = await ServiceModel.findOne({ name: serviceData.name });

    const errors: { [key in keyof ServiceRequestBody]: string } = {
      name: "",
      price: "",
      duration: "",
    };

    // no values
    if (!serviceData.name.trim()) {
      errors.name = "Service name is required";
    } else if (!serviceData.price) {
      errors.price = "Service price is required";
    } else if (!serviceData.duration) {
      errors.duration = "Service duration is required";
    }

    // format checks
    if (!validator.isLength(serviceData.name, { min: 2, max: 50 })) {
      errors.name = "Service name must be between 2 and 50 characters";
    } else if (
      serviceData?.description &&
      !validator.isLength(serviceData?.description, { min: 0, max: 500 })
    ) {
      errors.description =
        "Service description must be between 0 and 500 characters";
    } else if (!validator.isNumeric(serviceData.price.toString())) {
      errors.price = "Service price must be a number";
    } else if (!validator.isNumeric(serviceData.duration.toString())) {
      errors.duration = "Service duration must be a number";
    }

    // name must be unique
    else if (service) {
      errors.name = "Service name must be unique";
    }

    // create
    await ServiceModel.create({
      ...serviceData,
      user: userId,
    });

    return {
      service: await ServiceModel.find({ user: userId }).lean(),
      success: Object.keys(errors).length === 0,
      status:
        StatusCodes[Object.keys(errors).length === 0 ? "BAD_REQUEST" : "OK"],
      error: {
        message: Object.keys(errors).length === 0 ? "" : errors,
      },
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
