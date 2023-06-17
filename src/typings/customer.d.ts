import mongoose, { Document, ObjectId, Types } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import {
  CheckInQueueDocument,
  CheckInQueueItemsWithId,
  ICheckInQueueItems,
} from "./checkIn";
import { APIRet, Override } from "./global";
import { NextSocket } from "./socket";

// database schemas
export interface ICustomerItems {
  _id?: string;
  name: string;
  email?: string;
  phone: string;
  lastVisited?: string;
}

export type CustomerItemsWithoutId = Omit<ICustomerItems, "_id">;

export interface ICustomerHistory {
  _id?: string;
  customer: ObjectId;
  dateVisited: string;
  sessionDuration: number;
}

export type CustomerHistoryWithoutId = Omit<ICustomerHistory, "_id">;

// documents
export type CustomerDocument = Document<Types.ObjectId> &
  Omit<ICustomerItems, "_id">;

export type CustomerHistoryModel = Document<Types.ObjectId> &
  Omit<ICustomerHistory, "_id">;

// response data
export type CustomerResponse = APIRet & {
  customer?: CustomerDocument | CustomerDocument[] | null;
  customerHistory?: CustomerHistoryModel[];
  queues?: CheckInQueueDocument[];
  socketMessage?: string;
  queue?:
    | CheckInQueueDocument
    | ICheckInQueueItems
    | CheckInQueueItemsWithId
    | null;
};

// request types
export type CheckInCustomer = Override<
  NextApiRequest,
  {
    body: {
      customer?: ICustomerItems;
    };
    query: {
      customerId?: string;
    };
  }
>;

export type FindCustomerByPhoneRequest = Override<
  NextApiRequest,
  {
    body: {
      phone: string;
    };
  }
>;

// handler types
export type FindCustomerByPhoneHandler = (
  req: FindCustomerByPhoneRequest,
  res: NextApiResponse<CustomerResponse>
) => unknown;

export type CheckInCustomerHandler = (
  req: CheckInCustomer,
  res: NextApiResponse<CustomerResponse> & NextSocket
) => unknown;

// helper types
export type CheckPhoneNumber = (phone: string) => boolean;

export type FindByPhoneHelper = (phone: string) => Promise<CustomerResponse>;

export type CheckInCustomerHelper = (
  customer: string | ICustomerItems
) => Promise<CustomerResponse>;

export type AddToCustomerHistory = (
  customer: CustomerDocument,
  sessionDuration: ICustomerHistory["sessionDuration"]
) => Promise<CustomerHistoryModel[]>;

export type CreateCustomer = (
  customer: ICustomerItems
) => Promise<CustomerDocument>;

export type UpdateLastVisited = (
  customer: string
) => Promise<CustomerDocument | null>;
