/**
 * YAN HU HAIR
 *
 * Queues handler
 *
 * @author Zhaoyu Guo
 */

import {
  getWaitingForServiceQueue,
  transportWaitingCustomersViaSocket,
} from "@/lib/api/checkIns/helpers";
import { retrieveServicing } from "@/lib/api/checkIns/retrieveAll";
import { socketEmitter } from "@/lib/api/socket/helpers";
import { BaseQueueHandler } from "@/typings/checkIn";
import { StatusCodes } from "http-status-codes";

const servicingCustomersHandler: BaseQueueHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      const { success, error, queues, status } = await retrieveServicing();

      transportWaitingCustomersViaSocket(res);

      return res.status(status).json({
        success,
        error,
        queues,
        status,
      });

    default:
      return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
        success: false,
        error: { message: `${method} not allowed` },
        status: StatusCodes.METHOD_NOT_ALLOWED,
      });
  }
};

export default servicingCustomersHandler;
