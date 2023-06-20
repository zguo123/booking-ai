import { AvailabilityDate, WorkingHours } from "@/typings/availability";

export const days: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const initialWorkingHours: {
  [key in AvailabilityDate]: WorkingHours;
} = {
  monday: {
    from: "",
    to: "",
    isClosed: false,
  },

  tuesday: {
    from: "",
    to: "",

    isClosed: false,
  },

  wednesday: {
    from: "",
    to: "",
    isClosed: false,
  },

  thursday: {
    from: "",
    to: "",

    isClosed: false,
  },

  friday: {
    from: "",
    to: "",

    isClosed: false,
  },

  saturday: {
    from: "",
    to: "",
    isClosed: false,
  },

  sunday: {
    from: "",
    to: "",
    isClosed: false,
  },
};
