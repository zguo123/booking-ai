import SelectDatePage from "@/components/PageContent/Booking/SelectDatePage";
import dbConnect from "@/lib/dbConnect";
import AppointmentModel from "@/models/AppointmentModel";
import { AppointmentCookieData } from "@/typings/appointments";
import { cookies } from "next/headers";

export const metadata = {
  title: "Select date & Time",
};

export type BookingSelectDatePageProps = {
  params: {
    userId: string;
  };
};

export default async function BookingSelectDatePage({
  params: { userId },
}: BookingSelectDatePageProps) {
  await dbConnect();

  const appointmentCookies = cookies().get("appointment")?.value;

  const appointmentItems = await AppointmentModel.find({
    user: userId,
  });

  return (
    <SelectDatePage
      currentAppointments={appointmentItems}
      appointmentCookie={
        JSON.parse(appointmentCookies as string) as AppointmentCookieData
      }
    />
  );
}
