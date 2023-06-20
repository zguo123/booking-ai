import { NextApiRequest, NextApiResponse } from "next";
import { APIRet, Override } from "./global";

export type ServiceProps = {
  name: string;
  description?: string;
  price: number;
  duration: number;
  _id?: string;
};

export type ServiceRequestBody = Pick<
  ServiceProps,
  "name" | "description" | "price" | "duration"
>;

export type TimeStatus = "available" | "booked" | "unavailable";

export type TimeStatusProps = {
  time: string;
  status: TimeStatus;
};

export type SelectDateProps = {
  date: Date;
  times: TimeStatusProps[];
  _id?: string;
};

export type ServiceItems = ServiceProps & {
  user: string;
};

export type ServiceAPIResponse = APIRet & {
  service?: ServiceItems | ServiceItems[] | null;
};

export type GenericServiceRequest = Override<
  NextApiRequest,
  {
    query: {
      serviceId?: string;
      userId?: string;
    };
    body: {
      serviceData?: ServiceRequestBody;
      userId: string;
    };
  }
>;

export type GenericServiceHandler = (
  req: GenericServiceRequest,
  res: NextApiResponse<ServiceAPIResponse>
) => unknown;
