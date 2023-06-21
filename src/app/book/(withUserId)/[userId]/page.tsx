import ServicesPage from "@/components/PageContent/Booking/ServicesPage";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/UserModel";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type BookServicesPageProps = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: BookServicesPageProps): Promise<Metadata> {
  try {
    await dbConnect();
    // read route params
    const id = params.userId;

    // fetch data
    const user = await UserModel.findById(id).lean();

    // format the date to be in the format of "Month Year"
    if (!user) {
      notFound();
    }
    return {
      title: `Select Services | ${user?.username}`,
    };
  } catch (error) {
    notFound();
  }
}

export default function BookingServicesPage() {
  return <ServicesPage />;
}
