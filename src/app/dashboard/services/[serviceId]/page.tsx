import ViewServicePage from "@/components/DashboardComponents/ViewServicePage";
import dbConnect from "@/lib/dbConnect";
import ServiceModel from "@/models/ServiceModel";
import { Metadata } from "next";

type ServiceDetailPageProps = {
  params: { serviceId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  await dbConnect();

  // read route params
  const id = params.serviceId;

  // fetch data
  const service = await ServiceModel.findById(id);

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: `${service?.name} Service Details | Booking AI`,
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  return <ViewServicePage serviceId={params.serviceId} />;
}
