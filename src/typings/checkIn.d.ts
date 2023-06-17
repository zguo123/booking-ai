/**
 * YAN HU HAIR
 *
 * Check In queue type definitions
 *
 * @author Zhaoyu Guo
 */
import mongoose, { Document, ObjectId, Types } from "mongoose";

import { NextApiRequest, NextApiResponse } from "next";
import { CustomerDocument, ICustomerItems, CustomerResponse } from "./customer";
import { APIRet } from "./global";
import { NextSocket } from "./socket";

// database schemas
export interface ICheckInQueueItems {
  _id?: string;
  customer: Types.ObjectId | ICustomerItems;
  checkInDate: Date;
  checkOutDate: Date;
  duration: number;
  isAccepted: boolean;
  isCompleted: boolean;
}

export type CheckInQueueItemsWithoutId = Omit<ICheckInQueueItems, "_id">;
export type CheckInQueueItemsWithoutCustomer = Omit<
  ICheckInQueueItems,
  "customer"
>;

export type CheckInQueueItemsWithId = CheckInQueueItemsWithoutId & {
  _id: Types.ObjectId;
};

// documents
export type CheckInQueueDocument = Document<Types.ObjectId> &
  CheckInQueueItemsWithoutId;

// requests
export type CheckInQueueRequest = NextApiRequest &
  NextSocket & {
    query: {
      queueId?: string;
    };
  };

// endpoints
export type BaseQueueHandler = (
  req: CheckInQueueRequest,
  res: NextApiResponse<CustomerResponse> & NextSocket
) => unknown;

// helper function types
export type AddToQueue = (
  customer: CustomerDocument
) => Promise<CheckInQueueDocument[]>;

export type GetQueues = () => Promise<CustomerResponse>;
export type GetQueue = (queueId: string) => Promise<CustomerResponse>;

export type ServiceCustomer = (queueId: string) => Promise<CustomerResponse>;

export type CompleteService = (queueId: string) => Promise<CustomerResponse>;

export type CalculateDuration = (
  checkInDate: Date,
  checkOutDate: Date
) => number;
