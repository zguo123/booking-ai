import { days } from "@/lib/consts/days";
import { removeTokenCookie } from "@/lib/cookies";
import { formatDate, getDayAsName } from "@/lib/dateHelpers";
import {
  AppointmentCookieData,
  AppointmentItems,
  AppointmentResponse,
} from "@/typings/appointments";
import { AvailabilityItems, WorkingHours } from "@/typings/availability";
import { TimeStatusProps } from "@/typings/service";
import {
  parseAbsolute,
  parseAbsoluteToLocal,
  parseDateTime,
  parseZonedDateTime,
} from "@internationalized/date";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export const setAppointmentCookie = (
  res: NextApiResponse<AppointmentResponse>,
  cookieData: AppointmentCookieData
) => {
  removeTokenCookie(res);

  // set Temporary cookie
  const appointmentCookie = serialize(
    "appointment",
    JSON.stringify(cookieData),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      // 10 minutes
      maxAge: 60 * 10,
      sameSite: "strict",
      path: "/",
    }
  );

  res.setHeader("Set-Cookie", appointmentCookie);

  return appointmentCookie;
};

export const removeAppointmentCookie = (
  res: NextApiResponse<AppointmentResponse>
) => {
  const appointmentCookie = serialize("appointment", "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", appointmentCookie);
};

export const getAppointmentCookie = (
  req: NextApiRequest
): AppointmentCookieData | null => {
  const appointmentCookie = req?.cookies?.["appointment"];

  if (!appointmentCookie) return null;

  try {
    const appointmentData = JSON.parse(appointmentCookie);
    return appointmentData as AppointmentCookieData;
  } catch (error) {
    return null;
  }
};

export const getTimeStatus = (appointments: AppointmentItems[]) => {
  // get appointment times
  return appointments.map((appointment) => {
    const timeStart = parseAbsolute(
      (appointment?.appointmentDate as Date).toISOString(),
      "America/Toronto"
    );

    const timeEnd = timeStart.add({ minutes: appointment?.totalDuration });

    return {
      timeStart,
      timeEnd,
      id: appointment?._id,
    };
  });
};

export const getHours = (
  schedules: AvailabilityItems[],
  currMonthYear: string,
  dateString: string,
  duration: number,
  appointments: AppointmentItems[]
): TimeStatusProps[] => {
  let hours: TimeStatusProps[] = [];

  // schedule
  const schedule = schedules?.find(
    (schedule) => schedule.monthYear === currMonthYear
  );

  // convert monthYear to date
  const currDate = parseAbsoluteToLocal(new Date().toISOString());

  const date = new Date(dateString);

  const selectedDay = getDayAsName(date.getDay()).toLowerCase();

  // find open days
  const openedDays = Object.keys(schedule || {}).filter((key) => {
    if (days.includes(key)) {
      const workingHourInfo = schedule?.[
        key as keyof AvailabilityItems
      ] as WorkingHours;

      return !workingHourInfo?.isClosed;
    }
  });

  // search for the selectedDay in the openedDays array
  const isOpened = openedDays.includes(selectedDay);

  if (!isOpened) return [];

  // find hours
  const workingHourInfo = schedule?.[
    selectedDay as keyof AvailabilityItems
  ] as WorkingHours;

  // generate 30 min intervals from from to to
  const from = workingHourInfo?.from;
  const to = workingHourInfo?.to;

  const fromHour = Number(from?.split(":")[0]);
  const fromMin = Number(from?.split(":")[1]);

  const toHour = Number(to?.split(":")[0]);
  const toMin = Number(to?.split(":")[1]);

  const fromTime = new Date(dateString);
  fromTime.setHours(fromHour);
  fromTime.setMinutes(fromMin);

  const toTime = new Date(dateString);
  toTime.setHours(toHour);
  toTime.setMinutes(toMin);

  // interval in minutes from duration
  const interval = duration * 60 * 1000;

  for (
    let time = fromTime.getTime();
    time <= toTime.getTime();
    time += interval
  ) {
    const currTime = new Date(time);
    const hour = currTime.getHours();

    const min = currTime.getMinutes();

    // convert hour to 12 hour format
    const hour12hrString = hour > 12 ? `${hour - 12}` : `${hour}`;

    const minString = min < 10 ? `0${min}` : `${min}`;

    const AmToPm = hour >= 12 ? "PM" : "AM";

    // check if the time is in the past
    const isPast =
      parseAbsoluteToLocal(currTime?.toISOString()).compare(currDate) < 0;

    getTimeStatus(appointments).forEach((appointment) => {
      // compare the start time and currTime
      const startCompare = appointment.timeStart.compare(
        parseAbsoluteToLocal(currTime?.toISOString())
      );

      // compare the end time and currTime
      const endCompare = appointment.timeEnd.compare(
        parseAbsoluteToLocal(currTime?.toISOString())
      );

      // true if currentTime is between start and end time

      if (startCompare <= 0 && endCompare >= 0) {
        hours.push({
          time: `${hour12hrString}:${minString} ${AmToPm}`,
          status: "booked",
        });
      }
    });

    hours.push({
      time: `${hour12hrString}:${minString} ${AmToPm}`,
      status: isPast ? "unavailable" : "available",
    });

    // remove duplicates
    hours = hours.filter(
      (v, i, a) => a.findIndex((t) => t.time === v.time) === i
    );
  }

  return hours;
};
