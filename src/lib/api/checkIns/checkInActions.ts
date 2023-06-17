/**
 * YAN HU HAIR
 *
 * All the check in actions, excluding all the helpers.
 *
 * ADDITIONAL NOTES:
 * If you are looking for the helpers, please refer to the
 * './helpers.ts' file.
 *
 *
 * @author Zhaoyu Guo
 */

import CheckInQueueModel from "@/models/CheckInQueueModel";
import CustomerModel from "@/models/CustomerModel";
import { CompleteService, GetQueue, ServiceCustomer } from "@/typings/checkIn";
import { CustomerDocument } from "@/typings/customer";
import { StatusCodes } from "http-status-codes";
import { addToCustomerHistory } from "../customer/PUTCheckInCustomer";
import { constructServiceSocketString } from "../socket/helpers";
import { calculateSessionDuration } from "./helpers";

/**
 * Service a customer
 *
 * Precondition:
 * The queue exists and the user performing this action is authenticated
 *
 * @param queueId The queue id
 * @returns The updated queue along wit the status information
 */
export const serviceCustomer: ServiceCustomer = async (queueId) => {
  try {
    const serviceQueue = await CheckInQueueModel.findByIdAndUpdate(
      queueId,
      {
        isAccepted: true,
        checkInDate: new Date(),
      },
      { new: true }
    ).lean();

    return {
      success: true,
      status: StatusCodes.OK,
      queue: serviceQueue,
      socketMessage: await constructServiceSocketString(
        serviceQueue?.customer?.toString()
      ),
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

/**
 * Complete a service of a customer
 *
 * Precondition:
 * The queue exists and the user performing this action is authenticated
 *
 * @param queueId The queue id
 * @returns The updated queue along wit the status information
 */
export const completeService: CompleteService = async (queueId) => {
  try {
    const endDate = new Date();

    const currQueue = await CheckInQueueModel.findById(queueId).lean();

    const duration = calculateSessionDuration(currQueue?.checkInDate, endDate);

    // add it to the customer's history
    const customer = await CustomerModel.findById(currQueue?.customer);

    if (!customer) {
      return {
        success: false,
        error: { message: "Customer not found" },
        status: StatusCodes.NOT_FOUND,
      };
    }

    const histories = await addToCustomerHistory(customer, duration);

    const serviceQueue = await CheckInQueueModel.findByIdAndUpdate(
      queueId,
      {
        isCompleted: true,
        isAccepted: false,
        checkOutDate: endDate,
        duration,
      },
      { new: true }
    ).lean();

    return {
      success: true,
      status: StatusCodes.OK,
      queue: serviceQueue,
      customerHistory: histories,
      socketMessage: await constructServiceSocketString(
        serviceQueue?.customer?.toString()
      ),
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

export const getQueue: GetQueue = async (queueId) => {
  try {
    const queue = await CheckInQueueModel.findById(queueId).lean();

    if (!queue) {
      return {
        success: false,
        error: { message: "Queue not found" },
        status: StatusCodes.NOT_FOUND,
      };
    }

    return {
      success: true,
      status: StatusCodes.OK,
      queue,
    };
  } catch (error: any) {
    return {
      success: false,
      error: { message: error.message },
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};
