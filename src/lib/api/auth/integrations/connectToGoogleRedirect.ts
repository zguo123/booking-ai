import logger from "@/lib/logger";
import { IntegrationAPIRes } from "@/typings/integrations";
import { IntegrationAuth } from "@/typings/user";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../authentication";
import UserModel from "@/models/UserModel";

export default async (
  integrationType: IntegrationAuth,
  code: string,
  authToken: string
): Promise<IntegrationAPIRes> => {
  try {
    if (integrationType !== "google") {
      return {
        success: false,
        status: StatusCodes.BAD_REQUEST,
        error: {
          message: 'This endpoint only handles "google" integration.',
        },
      };
    }

    // user *MUST* be signed in -- assume this is true
    const user: any = await verifyToken(authToken);

    // find user
    const profile = await UserModel.findOne({ email: user.email });

    if (!profile) {
      return {
        success: false,
        status: StatusCodes.NOT_FOUND,
        error: {
          message: "User not found",
        },
      };
    }

    profile.integrations.push({
      integrationName: "Google Calendar",
      code: code,
    });

    await profile.save();

    return {
      success: true,
      status: StatusCodes.OK,
    };
  } catch (err) {
    logger.error(`[googleSuccess] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Something went wrong",
      },
    };
  }
};
