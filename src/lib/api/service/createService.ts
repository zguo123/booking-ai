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
    const service = await ServiceModel.findOne({
      name: serviceData.name.trim(),
      user: userId,
    });

    const errors: { [key in keyof ServiceRequestBody]: string | undefined } = {
      name: undefined,
      price: undefined,
      duration: undefined,
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
      errors.name = `A service with the name ${serviceData.name} already exists on your account.`;
    }
    const doesHaveErrors = Object.values(errors).some((error) => !!error);

    if (!doesHaveErrors) {
      // create
      await ServiceModel.create({
        ...serviceData,
        name: serviceData.name.trim(),
        description: serviceData?.description?.trim(),
        user: userId,
      });
    }

    return {
      success: !doesHaveErrors,
      status: StatusCodes[doesHaveErrors ? "BAD_REQUEST" : "CREATED"],
      error: {
        message: !doesHaveErrors ? "" : errors,
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
