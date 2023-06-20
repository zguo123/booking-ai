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
export const getMonthAsName = (monthDayYear: string): string => {
  const parsedDate = parseDate(monthDayYear);
  const month = Number(parsedDate.month);

  return months[month - 1];
};

export const getMonthNameFromNumber = (month: number): string => {
  return months[month - 1];
};

export const formatMonthYear = (monthYear: string): string => {
  if (!monthYear) {
    return "";
  }

  const parsedDate = parseDate(`${monthYear}-01`);

  return `${getMonthNameFromNumber(parsedDate.month)} ${parsedDate.year}`;
};

export function convert12HourTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = String(parseInt(hours, 10) + 12);
  }

  return `${hours}:${minutes}`;
}
