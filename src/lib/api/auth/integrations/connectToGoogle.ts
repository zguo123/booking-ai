import logger from "@/lib/logger";
import { IntegrationAPIRes } from "@/typings/integrations";
import { IntegrationAuth } from "@/typings/user";
import { StatusCodes } from "http-status-codes";
import { google } from "googleapis";

export default async (
  integrationType: IntegrationAuth
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

    // client
    const client = new google.auth.OAuth2({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URL,
    });

    // generate a url that asks permissions for Google Calendar scopes
    const scopes = ["https://www.googleapis.com/auth/calendar"];

    const url = client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      // If you only need one scope you can pass it as a string
      scope: scopes,
    });

    return {
      authUrl: url,
      success: true,
      status: StatusCodes.OK,
    };
  } catch (err) {
    logger.error(`[connectToGoogle] ${err}`);

    return {
      success: false,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        message: "Something went wrong",
      },
    };
  }
};
