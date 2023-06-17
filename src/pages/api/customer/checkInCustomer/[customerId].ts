/**
 * YAN HU HAIR
 *
 * Check In Customer API
 *
 * @author Zhaoyu Guo
 */

import checkInCustomer from "@/lib/api/customer/PUTCheckInCustomer";
import { errorHandler } from "@/lib/api/errorHandler";
import { socketEmitter } from "@/lib/api/socket/helpers";
import { CheckInCustomerHandler, ICustomerItems } from "@/typings/customer";
import { StatusCodes } from "http-status-codes";

const checkInCustomerHandler: CheckInCustomerHandler = async (req, res) => {
  const {
    body: { ...customer },
    query: { customerId },
    method,
  } = req;

  switch (method) {
    case "POST":
      try {
        const {
          status,
          error,
          customer: customerData,
          success,
          queues,
        } = await checkInCustomer(
          (customerId as string) !== "null"
            ? (customerId as string)
            : (customer as ICustomerItems)
        );


        socketEmitter(res, "queues", queues);

        return res.status(status).json({
          success,
          error,
          customer: customerData,
          status,
        });
      } catch (error: any) {
        const errors = errorHandler(error?.message, error?.code);

        return res
          .status(
            errors ? StatusCodes.BAD_REQUEST : StatusCodes.INTERNAL_SERVER_ERROR
          )
          .json({
            success: false,
            error: { message: errors || error.message },
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

export default checkInCustomerHandler;
