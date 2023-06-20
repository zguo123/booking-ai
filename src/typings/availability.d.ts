import { NextApiRequest } from "next";
import { APIRet } from "./global";
import { Time } from "@internationalized/date";

export type AvailabilityItems = {
  _id?: string;
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
  includeHolidays: boolean;
  user: string;
  monthYear: string;
};

export type AvailabilityDate =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type AvailabilityRequestBody = Pick<
  AvailabilityItems,
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
  | "includeHolidays"
  | "monthYear"
>;

export type WorkingHours = {
  _id?: string;
  from: string;
  to: string;
  isClosed: boolean;
};

export type AvailabilityAPIResponse = APIRet & {
  availability?: AvailabilityItems | AvailabilityItems[] | null;
};

export type GenericAvailabilityRequest = Override<
  NextApiRequest,
  {
    query: {
      availabilityId?: string;
      userId?: string;
    };
    body: {
      availabilityData?: AvailabilityRequestBody;
      userId: string;
    };
  }
>;

export type GenericAvailabilityHandler = (
  req: GenericAvailabilityRequest,
  res: NextApiResponse<AvailabilityAPIResponse>
) => unknown;

export type AddAvailability = (
  body: AvailabilityRequestBody,
  userId: string
) => Promise<AvailabilityAPIResponse>;
