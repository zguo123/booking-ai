/**
 * YAN HU HAIR
 *
 * Complete a service customer with queue id handler
 *
 * @author Zhaoyu Guo
 */

import { completeService } from "@/lib/api/checkIns/checkInActions";
import { transportWaitingCustomersViaSocket } from "@/lib/api/checkIns/helpers";
import { socketEmitter } from "@/lib/api/socket/helpers";
import { isAuthenticated } from "@/lib/api/user/auth/authentication";
import dbConnect from "@/lib/dbConnect";
import CheckInQueueModel from "@/models/CheckInQueueModel";
import { BaseQueueHandler } from "@/typings/checkIn";
import { StatusCodes } from "http-status-codes";

const completeServiceHandler: BaseQueueHandler = async (req, res) => {
  const {
    query: { queueId },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
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
        const q = await CheckInQueueModel.findById(queueId);

        if (!q) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            error: { message: "Queue not found" },
            status: StatusCodes.NOT_FOUND,
          });
        }

        const { success, error, status, queue, socketMessage, ...rest } =
          await completeService(queueId as string);

        socketEmitter(res, socketMessage as string, queue);
        await transportWaitingCustomersViaSocket(res);

        return res.status(status).json({
          success,
          error,
          status,
          queue,
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

export default completeServiceHandler;
