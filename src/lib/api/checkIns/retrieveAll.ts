/**
 * YAN HU HAIR
 *
 * Retrieve all check ins
 *
 * @author Zhaoyu Guo
 */

import CheckInQueueModel from "@/models/CheckInQueueModel";
import { GetQueues } from "@/typings/checkIn";
import { StatusCodes } from "http-status-codes";

const retrieveAll: GetQueues = async () => {
  try {
    const queues = await CheckInQueueModel.find({
      isCompleted: true,
    });

    return {
      success: true,
      queues,
      status: StatusCodes.OK,
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const retrieveServicing: GetQueues = async () => {
  try {
    const queues = await CheckInQueueModel.find({
      isCompleted: false,
      isAccepted: true,
    });

    return {
      success: true,
      queues,
      status: StatusCodes.OK,
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export default retrieveAll;
