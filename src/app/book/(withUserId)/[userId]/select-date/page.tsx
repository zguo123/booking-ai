import SelectDatePage from "@/components/PageContent/Booking/SelectDatePage";
import { AppointmentCookieData } from "@/typings/appointments";
import { cookies } from "next/headers";

export const metadata = {
  title: "Select date & Time",
};

export default function BookingSelectDatePage() {
  const appointmentCookies = cookies().get("appointment")?.value;

  return (
    <SelectDatePage
      appointmentCookie={
        JSON.parse(appointmentCookies as string) as AppointmentCookieData
      }
    />
  );
}
