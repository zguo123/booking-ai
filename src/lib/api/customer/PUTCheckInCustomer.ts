/**
 * YAN HU HAIR
 *
 * PUT Check In Customer Endpoint helpers
 *
 * ADDITIONAL NOTES:
 * This file is used to store the helper functions for the
 * PUT Check In Customer Endpoint
 *
 * @author Zhaoyu Guo
 */

import CheckInQueueModel from "@/models/CheckInQueueModel";
import CustomerHistoryModel from "@/models/CustomerHistoryModel";
import CustomerModel from "@/models/CustomerModel";
import { AddToQueue } from "@/typings/checkIn";
import {
  AddToCustomerHistory,
  CheckInCustomerHelper,
  CreateCustomer,
  CustomerDocument,
  UpdateLastVisited,
} from "@/typings/customer";
import { StatusCodes } from "http-status-codes";
import { getWaitingForServiceQueue } from "../checkIns/helpers";
import { errorHandler } from "../errorHandler";

export const addToCustomerHistory: AddToCustomerHistory = async (
  customer,
  sessionDuration
) => {
  await CustomerHistoryModel.create({
    customer: Object(customer?._id),
    dateVisited: new Date()?.toISOString(),
    sessionDuration: sessionDuration,
  });

  return await CustomerHistoryModel.find({ customer: customer });
};

export const addToCheckInQueue: AddToQueue = async (customer) => {
  await CheckInQueueModel.create({
    customer: Object(customer?._id),
  });

  return await getWaitingForServiceQueue();
};

export const createCustomer: CreateCustomer = async (customer) => {
  return await CustomerModel.create({
    ...customer,
    lastVisited: new Date()?.toISOString(),
  });
};

export const updateVisit: UpdateLastVisited = async (customer) => {
  return await CustomerModel.findByIdAndUpdate(
    customer,
    { lastVisited: new Date()?.toISOString() },
    { new: true }
  ).lean();
};

/**
 * Checks in a customer to the system
 *
 * NOTES:
 * The parameter `customer` can be either the customer id or the customer object.
 * As a precondition, we can safely assume that if the `customer` is an object,
 * then we assume that the customer does not exist. Otherwise, we assume that the
 * customer exists.
 *
 * @param customer Either the customer id or the customer object to check in
 */
const checkInCustomer: CheckInCustomerHelper = async (customer) => {
  try {
    let queues = [];
    let createdCustomer = null;
    // check if the customer is an object
    if (typeof customer === "object") {
      // create the customer with the `customer` object
      createdCustomer = await createCustomer(customer);

      // add the current session to the customer's history
      queues = await addToCheckInQueue(createdCustomer);
    } else {
      // update the customer's `lastVisited` attribute to the current date
      createdCustomer = await updateVisit(customer);
      // add the current session to the customer's history
      queues = await addToCheckInQueue(createdCustomer as CustomerDocument);
    }

    // return the customerData
    return {
      success: true,
      status: StatusCodes.OK,
      queues,
      customer: createdCustomer,
    };
  } catch (error: any) {
    const errors = errorHandler(error?.message, error?.code);
    console.log(errors);

    return {
      success: false,
      status: errors
        ? StatusCodes.BAD_REQUEST
        : StatusCodes.INTERNAL_SERVER_ERROR,
      error: { message: errors || error.message },
    };
  }
};

export default checkInCustomer;
