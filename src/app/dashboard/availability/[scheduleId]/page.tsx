import { formatMonthYear } from "@/lib/dateHelpers";
import dbConnect from "@/lib/dbConnect";
import AvailabilityModel from "@/models/AvailabilityModel";
import { Metadata } from "next";

type ScheduleDetailPageProps = {
  params: { scheduleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: ScheduleDetailPageProps): Promise<Metadata> {
  await dbConnect();

  // read route params
  const id = params.scheduleId;

  // fetch data
  const schedule = await AvailabilityModel.findById(id).lean();

  console.log(schedule?.monthYear);

  if (!schedule) {
    return {
      title: `Schedule Not Found | Booking AI`,
    };
  }

  // format the date to be in the format of "Month Year"

  return {
    title: `Schedule for ${formatMonthYear(
      `${schedule?.monthYear}`
    )} | Booking AI`,
  };
}

export default function ScheduleDetailsPage({
  params,
}: ScheduleDetailPageProps) {
  return <></>;
}
