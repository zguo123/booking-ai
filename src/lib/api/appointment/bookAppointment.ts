import logger from "@/lib/logger";
import {
  AppointmentCookieData,
  AppointmentResponse,
  ContactInfo,
} from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import { removeAppointmentCookie, setAppointmentCookie } from "./helpers";
import validator from "validator";
import AppointmentModel from "@/models/AppointmentModel";
import ServiceModel from "@/models/ServiceModel";

export default async (
  contactInfo: ContactInfo,
  res: NextApiResponse<AppointmentResponse>,
  userId: string,
  cookieData?: AppointmentCookieData
): Promise<AppointmentResponse> => {
  try {
    let errors: {
      [key in keyof ContactInfo]: string | undefined;
    } = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      phone: undefined,
      appointmentNotes: undefined,
    };

    // name validator
    if (!contactInfo.firstName) {
      errors.firstName = "First name is required";
    } else if (!contactInfo.lastName) {
      errors.lastName = "Last name is required";
    } else if (
      !validator.isAlpha(contactInfo.firstName) ||
      !validator.isAlpha(contactInfo.lastName)
    ) {
      errors.firstName = "Name is invalid";
      errors.lastName = "Name is invalid";
    }

    // email validator
    if (!contactInfo.email) {
      errors.email = "Email is required";
    } else if (!validator.isEmail(contactInfo.email)) {
      errors.email = "Email is invalid";
    }

    // phone number
    if (!contactInfo.phone) {
      errors.phone = "Phone number is required";
    } else if (
      !validator.isMobilePhone(contactInfo?.phone as string, "en-CA")
    ) {
      errors.phone = "Your phone must be a valid Canadian phone number";
    }

    const doesHaveErrors = Object.values(errors).some((error) => !!error);

    if (!doesHaveErrors) {
      // calculate total price
      const allPrices = await Promise.all(
        (cookieData?.services as string[]).map(async (service) => {
          // find service
          const serviceData = await ServiceModel.findOne({ name: service });

          return serviceData?.price;
        })
      );

      const totalPrice = allPrices.reduce(
        (acc, curr) => (acc as number) + (curr as number),
        0 as number
      );

      // set appointment cookie
      setAppointmentCookie(res, {
        ...cookieData,
        ...contactInfo,
      });

      // input in database
      await AppointmentModel.create({
        user: userId,
        ...contactInfo,
        ...cookieData,
        totalPrice,
      });
    }

    logger.child({ errors }).info("[bookAppointment]");

    return {
      success: !doesHaveErrors,
      status: StatusCodes[doesHaveErrors ? "BAD_REQUEST" : "OK"],
      error: {
        message: !doesHaveErrors ? "" : errors,
      },
    };
  } catch (err) {
    logger.info(`[selectServices] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
