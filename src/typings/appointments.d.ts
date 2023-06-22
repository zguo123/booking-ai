import { ColumnDef } from "@saas-ui/pro";
import { ServiceItems } from "./service";
import { APIRet, Override } from "./global";
import { NextApiRequest, NextApiResponse } from "next";

export type AppointmentItems = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  appointmentDate: Date;
  services: string[];
  totalPrice: number;
  appointmentNotes?: string;
};

export type AppointmentRequestData = Pick<
  AppointmentItems,
  "name" | "email" | "phone" | "appointmentDate" | "services" | "totalPrice"
>;

export type AppointmentCookieData = Partial<AppointmentRequestData>;

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
