import { isAuthenticated } from "@/lib/api/auth/authentication";
import connectToGoogle from "@/lib/api/auth/integrations/connectToGoogle";
import { IntegrationAPIHandler } from "@/typings/integrations";
import { StatusCodes } from "http-status-codes";

const connectIntegrationHandler: IntegrationAPIHandler = async (req, res) => {
  const {
    method,
    query: { provider },
    body,
  } = req;

  if (!isAuthenticated(req?.cookies?.token as string)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      status: StatusCodes.UNAUTHORIZED,
      error: {
        message: "User not authenticated",
      },
    });
  }

  switch (method) {
    case "POST":
      switch (provider) {
        case "google":
          const {
            success: googleSuccess,
            status: googleStatus,
            error: googleError,
            ...googleRest
          } = await connectToGoogle(provider);

          return res.status(googleStatus).json({
            success: googleSuccess,
            status: googleStatus,
            ...googleRest,
          });

        default:
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            status: StatusCodes.BAD_REQUEST,
            error: {
              message: `Your integration is not supported yet.`,
            },
          });
      }

    default:
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        status: StatusCodes.METHOD_NOT_ALLOWED,
        error: {
          message: "Invalid method",
        },
      });
  }
};

export default connectIntegrationHandler;
