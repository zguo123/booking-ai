import {
  AppointmentDataStructure,
  AppointmentItems,
} from "@/typings/appointments";
import { ColumnDef } from "@saas-ui/pro";

export const appointmentDataColumns = [
  {
    id: "name",
    header: "Name",
  },
  {
    id: "email",
    header: "Email",
  },
  {
    id: "phone",
    header: "Phone",
  },
  {
    id: "appointmentDate",
    header: "Appointment Date",
  },
  {
    id: "services",
    header: "Services",
  },
  {
    id: "totalPrice",
    header: "Total Price",
    isNumeric: true,
  },
];

export const appointmentData: AppointmentItems[] = [
  {
    id: "1",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    appointmentDate: new Date("2023-06-18T10:00:00"),
    services: ["Haircut"],
    totalPrice: 30,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "janesmith@example.com",
    phone: "987-654-3210",
    appointmentDate: new Date("2023-06-19T14:30:00"),
    services: ["Hair Coloring"],
    totalPrice: 150,
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    phone: "555-123-4567",
    appointmentDate: new Date("2023-06-20T09:15:00"),
    services: ["Hair Styling"],
    totalPrice: 60,
  },
  {
    id: "4",
    name: "Bob Wilson",
    email: "bobwilson@example.com",
    phone: "999-888-7777",
    appointmentDate: new Date("2023-06-21T16:00:00"),
    services: ["Haircut"],
    totalPrice: 30,
  },
  {
    id: "5",
    name: "Emily Davis",
    email: "emilydavis@example.com",
    phone: "111-222-3333",
    appointmentDate: new Date("2023-06-22T11:30:00"),
    services: ["Hair Coloring"],
    totalPrice: 150,
  },
  {
    id: "6",
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    phone: "444-555-6666",
    appointmentDate: new Date("2023-06-23T13:45:00"),
    services: ["Hair Styling"],
    totalPrice: 60,
  },
  {
    id: "7",
    name: "Sarah Wilson",
    email: "sarahwilson@example.com",
    phone: "777-888-9999",
    appointmentDate: new Date("2023-06-24T10:30:00"),
    services: ["Haircut"],
    totalPrice: 30,
  },
  {
    id: "8",
    name: "David Thompson",
    email: "davidthompson@example.com",
    phone: "222-333-4444",
    appointmentDate: new Date("2023-06-25T14:15:00"),
    services: ["Hair Coloring"],
    totalPrice: 150,
  },
  {
    id: "9",
    name: "Olivia Johnson",
    email: "oliviajohnson@example.com",
    phone: "666-777-8888",
    appointmentDate: new Date("2023-06-26T16:30:00"),
    services: ["Hair Styling"],
    totalPrice: 60,
  },
  {
    id: "10",
    name: "Thomas Davis",
    email: "thomasdavis@example.com",
    phone: "444-555-6666",
    appointmentDate: new Date("2023-06-27T11:00:00"),
    services: ["Haircut"],
    totalPrice: 30,
  },
];
