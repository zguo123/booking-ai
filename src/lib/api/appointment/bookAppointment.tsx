import logger from "@/lib/logger";
import AppointmentModel from "@/models/AppointmentModel";
import ServiceModel from "@/models/ServiceModel";
import {
  AppointmentCookieData,
  AppointmentResponse,
  ContactInfo,
} from "@/typings/appointments";
import { StatusCodes } from "http-status-codes";
import { NextApiResponse } from "next";
import validator from "validator";
import { setAppointmentCookie } from "./helpers";
import UserModel from "@/models/UserModel";
import { formatDate } from "@/lib/dateHelpers";
import { formatPrice } from "@/lib/helpers/appointment";
import { AppointmentConfirmed } from "@/emails/schedlu-booking-confirm";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { IUserItems } from "@/typings/user";

export const sendConfirmationEmail = async (
  authUser: IUserItems,
  appointmentEmail: string,
  appointmentDate: string,
  services: string,
  totalPrice: string
): Promise<boolean> => {
  try {
    const authFullName = `${authUser.firstName} ${authUser.lastName}`;

    const AppointmentEmailComponent = (
      <AppointmentConfirmed
        appointmentDate={appointmentDate}
        services={services}
        price={totalPrice}
      />
    );

    const renderedEmail = render(
      <AppointmentConfirmed
        appointmentDate={appointmentDate}
        services={services}
        price={totalPrice}
      />
    );

    const plainTextEmail = render(
      <AppointmentConfirmed
        appointmentDate={appointmentDate}
        services={services}
        price={totalPrice}
      />,
      {
        plainText: true,
      }
    );

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL_USERNAME,
        pass: process.env.AUTH_EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${authFullName}" <${process.env.AUTH_EMAIL_USERNAME}>`,
      to: appointmentEmail,
      replyTo: authUser.email,
      subject: `Your appointment with ${authFullName} has been booked!`,
      html: renderedEmail,
      text: plainTextEmail,
    });

    return true;
  } catch (err) {
    logger.error(`Error sending email: ${err}`);
    return false;
  }
};

export default async (
  contactInfo: ContactInfo,
  res: NextApiResponse<AppointmentResponse>,
  userId: string,
  cookieData?: AppointmentCookieData
): Promise<AppointmentResponse> => {
  try {
    // find the user
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

    let sendResult = false;

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

      // send confirmation email
      sendResult = await sendConfirmationEmail(
        user,
        contactInfo?.email as string,
        formatDate(cookieData?.appointmentDate as Date),
        cookieData?.services?.join(", ") as string,
        formatPrice(totalPrice as number)
      );
    }

    logger.child({ errors }).info("[bookAppointment]");

    logger.info(
      `[bookAppointment] -- email sent? ${sendResult ? "yes" : "no"}`
    );

    return {
      success: !doesHaveErrors || !sendResult,
      status: StatusCodes[doesHaveErrors || !sendResult ? "BAD_REQUEST" : "OK"],
      error: {
        message: !doesHaveErrors ? "" : errors,
      },
    };
  } catch (err) {
    logger.error(`[confirmAppointment] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Internal Server Error",
      },
    };
  }
};
