import { parseDate } from "@internationalized/date";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getMonthAsName = (montDayYear: string): string => {
  const parsedDate = parseDate(montDayYear);
  const month = Number(parsedDate.month);

  return months[month - 1];
};

export const getMonthNameFromNumber = (month: number): string => {
  return months[month - 1];
};
