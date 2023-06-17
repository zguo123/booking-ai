/**
 * YAN HU HAIR
 *
 * Socket Helpers
 *
 * @author Zhaoyu Guo
 */

import CustomerModel from "@/models/CustomerModel";
import { ConstructServiceString, EmitSocketResponse } from "@/typings/socket";

export const socketEmitter: EmitSocketResponse = (res, event, data) => {
  const { socket } = res;

  socket?.server?.io?.emit(event, data);
};

export const constructServiceSocketString: ConstructServiceString = async (
  customerId
) => {
  const customer = await CustomerModel.findById(customerId);

  return `serviceStatus-${customer?.phone}`;
};
