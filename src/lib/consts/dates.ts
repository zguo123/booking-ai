import { SelectDateProps } from "@/typings/service";

export const sampleDates: SelectDateProps[] = [
  {
    date: new Date("2023-06-18"),
    times: [
      {
        time: "10:00 AM",
        status: "available",
      },
      {
        time: "11:00 AM",
        status: "booked",
      },
      {
        time: "12:00 PM",
        status: "available",
      },
      {
        time: "01:00 PM",
        status: "unavailable",
      },
      {
        time: "02:00 PM",
        status: "available",
      },
      {
        time: "03:00 PM",
        status: "available",
      },
    ],
    _id: "1",
  },
  {
    date: new Date("2023-06-19"),
    times: [
      {
        time: "09:00 AM",
        status: "available",
      },
      {
        time: "10:00 AM",
        status: "available",
      },
      {
        time: "11:00 AM",
        status: "unavailable",
      },
      {
        time: "12:00 PM",
        status: "available",
      },
      {
        time: "01:00 PM",
        status: "available",
      },
      {
        time: "02:00 PM",
        status: "booked",
      },
    ],
    _id: "2",
  },
  {
    date: new Date("2023-06-20"),
    times: [
      {
        time: "09:00 AM",
        status: "available",
      },
      {
        time: "10:00 AM",
        status: "available",
      },
      {
        time: "11:00 AM",
        status: "available",
      },
      {
        time: "12:00 PM",
        status: "booked",
      },
      {
        time: "01:00 PM",
        status: "available",
      },
      {
        time: "02:00 PM",
        status: "available",
      },
    ],
    _id: "3",
  },
];
