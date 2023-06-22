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

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const getMonthAsName = (monthDayYear: string): string => {
  const parsedDate = parseDate(monthDayYear);
  const month = Number(parsedDate.month);

  return months[month - 1];
};

export const getDayAsName = (day: number): string => {
  return days[day];
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
  } else {
    // if the modifier is AM and the hour is less than 12, pad with a 0
    if (parseInt(hours, 10) < 10) {
      hours = `0${hours}`;
    } else {
      hours = String(parseInt(hours, 10));
    }
  }

  return `${hours}:${minutes}`;
}
