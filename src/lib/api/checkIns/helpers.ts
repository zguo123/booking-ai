/**
 * YAN HU HAIR
 *
 * All the helpers for the check in actions.
 *
 *
 * @author Zhaoyu Guo
 */

import CheckInQueueModel from "@/models/CheckInQueueModel";
import { CalculateDuration, CheckInQueueDocument } from "@/typings/checkIn";
import { NextSocket } from "@/typings/socket";
import { NextApiResponse } from "next";
import { socketEmitter } from "../socket/helpers";

export const getWaitingForServiceQueue = async (): Promise<
  CheckInQueueDocument[]
> => {
  const queues = await CheckInQueueModel.find({
    isCompleted: false,
    isAccepted: false,
  });

  return queues;
};

export const transportWaitingCustomersViaSocket = async (
  res: NextSocket
): Promise<void> => {
  const awaitingService = await getWaitingForServiceQueue();

  socketEmitter(res, "queues", awaitingService);
};

export const calculateSessionDuration: CalculateDuration = (start, end) => {
  return end.getSeconds() - start.getSeconds();
};
