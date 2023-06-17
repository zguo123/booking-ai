/**
 * YAN HU HAIR
 *
 * GET Phone number helpers
 *
 * @author Zhaoyu Guo
 */

import CustomerModel from "@/models/CustomerModel";
import { CheckPhoneNumber, FindByPhoneHelper } from "@/typings/customer";
import { StatusCodes } from "http-status-codes";
import validator from "validator";

/**
 * Check if the phone number is valid
 *
 * @param phone The phone number to check
 * @returns true if the phone number is valid
 */
export const checkPhoneNumber: CheckPhoneNumber = (phone) => {
  return validator.isMobilePhone(phone, "en-CA");
};

/**
 * The helper function to find a customer by phone number
 *
 * @param phone The phone number to find
 * @returns The customer with the phone number or null
 */
const findCustomerByPhone: FindByPhoneHelper = async (phone) => {
  if (!checkPhoneNumber(phone)) {
    return {
      success: false,
      error: {
        message: {
          phone: `${phone} is not a valid Canadian phone number`,
        },
      },
      status: StatusCodes.BAD_REQUEST,
    };
  }

  // if the phone number is valid
  const customer = await CustomerModel.findOne({ phone });

  return {
    success: true,
    customer: customer,
    status: StatusCodes.OK,
  };
};

export default findCustomerByPhone;
