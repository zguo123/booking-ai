/**
 * YAN HU HAIR
 *
 * Phone Number API
 *
 * @author Zhaoyu Guo
 */

import findCustomerByPhone from "@/lib/api/customer/GETbyPhonenumber";
import dbConnect from "@/lib/dbConnect";
import { FindCustomerByPhoneHandler } from "@/typings/customer";
import { StatusCodes } from "http-status-codes";

const findCustomerByPhoneHandler: FindCustomerByPhoneHandler = async (
  req,
  res
) => {
  const {
    body: { phone },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { status, error, customer, success } = await findCustomerByPhone(
          phone
        );

        return res.status(status).json({
          success,
          error,
          customer,
          status,
        });
      } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          error: { message: error.message },
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
export default findCustomerByPhoneHandler;
