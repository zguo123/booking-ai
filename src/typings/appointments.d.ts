import { ColumnDef } from "@saas-ui/pro";
import { ServiceItems } from "./service";
import { APIRet, Override } from "./global";
import { NextApiRequest, NextApiResponse } from "next";

export type AppointmentItems = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  appointmentDate: Date;
  services: string[];
  totalPrice: number;
  appointmentNotes?: string;
  user: string;
};

export type AppointmentRequestData = Pick<
  AppointmentItems,
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "appointmentDate"
  | "services"
  | "totalPrice"
  | "appointmentNotes"
>;

export type AppointmentCookieData = Partial<AppointmentRequestData>;

export type ContactInfo = Pick<
  AppointmentCookieData,
  "firstName" | "lastName" | "email" | "phone" | "appointmentNotes"
>;

export type AppointmentDataStructure = ColumnDef<
  keyof AppointmentItems,
  AppointmentItems
>[];

export type AppointmentResponse = APIRet & {
  appointment?: AppointmentItems | null;
  appointments?: AppointmentItems[] | null;
  tempAppointmentData?: AppointmentCookieData | null;
};

export type AppointmentRequest = Override<
  NextApiRequest,
  {
    query: {
      userId?: string;
      appointmentId?: string;
    };
    body: {
      userId?: string;
      appointmentData?: AppointmentCookieData;
    };
  }
>;

export type GenericAppointmentAPIHandler = (
  req: AppointmentRequest,
  res: NextApiResponse<AppointmentResponse>
) => void;
