import AvailabilityDetailsPage from "@/components/PageContent/Dashboard/AvailabilityDetailsPage";
import { formatMonthYear } from "@/lib/dateHelpers";
import dbConnect from "@/lib/dbConnect";
import { sanitizeSchedule } from "@/lib/scheduleHelpers";
import AvailabilityModel from "@/models/AvailabilityModel";
import { AvailabilityItems } from "@/typings/availability";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ScheduleDetailPageProps = {
  params: { scheduleId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: ScheduleDetailPageProps): Promise<Metadata> {
  try {
    await dbConnect();

    // read route params
    const id = params.scheduleId;

    // fetch data
    const schedule = await AvailabilityModel.findById(id).lean();

    if (!schedule) {
      notFound();
    }

    // format the date to be in the format of "Month Year"

    return {
      title: `Schedule for ${formatMonthYear(
        `${schedule?.monthYear}`
      )} | Booking AI`,
    };
  } catch (error) {
    notFound();
  }
}

export default async function ScheduleDetailsPage({
  params,
}: ScheduleDetailPageProps) {
  await dbConnect();
  const schedule = await AvailabilityModel.findById(params.scheduleId).lean();

  const scheduleData = sanitizeSchedule(schedule as AvailabilityItems);

  return (
    <AvailabilityDetailsPage
      scheduleId={params.scheduleId}
      scheduleData={scheduleData as AvailabilityItems}
    />
  );
}
