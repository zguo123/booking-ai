/**
 * YAN HU HAIR
 *
 * Complete a service customer with queue id handler
 *
 * @author Zhaoyu Guo
 */

import { completeService, getQueue } from "@/lib/api/checkIns/checkInActions";
import { transportWaitingCustomersViaSocket } from "@/lib/api/checkIns/helpers";
import { socketEmitter } from "@/lib/api/socket/helpers";
import { isAuthenticated } from "@/lib/api/user/auth/authentication";
import dbConnect from "@/lib/dbConnect";
import CheckInQueueModel from "@/models/CheckInQueueModel";
import { BaseQueueHandler } from "@/typings/checkIn";
import { StatusCodes } from "http-status-codes";

const queueActionsHandler: BaseQueueHandler = async (req, res) => {
  const {
    query: { queueId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        if (!isAuthenticated(req?.cookies?.token as string)) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            error: { message: "Unauthorized" },
            status: StatusCodes.UNAUTHORIZED,
          });
        }

        // find if queue exists with queue id
        // if not, return 404
        const queue = await CheckInQueueModel.findById(queueId);

        const { success, error, status, ...rest } = await getQueue(
          queueId as string
        );

        await transportWaitingCustomersViaSocket(res);

        return res.status(status).json({
          success,
          error,
          status,
          ...rest,
        });
      } catch (err: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: { message: err.message },
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        });
      }

    default:
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        error: { message: `${method} not allowed` },
        status: StatusCodes.METHOD_NOT_ALLOWED,
      });
  }
};

export default queueActionsHandler;
