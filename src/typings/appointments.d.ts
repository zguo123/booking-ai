import { ColumnDef } from "@saas-ui/pro";
import { ServiceItems } from "./service";

export type AppointmentItems = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointmentDate: Date;
  services: string[];
  totalPrice: number;
};

export type AppointmentDataStructure = ColumnDef<
  keyof AppointmentItems,
  AppointmentItems
>[];
