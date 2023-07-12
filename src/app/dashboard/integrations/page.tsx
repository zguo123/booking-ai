import DashboardIntegrationPage from "@/components/PageContent/Dashboard/DashboardIntegrationPage";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Third Party Integrations | Booking AI",
};

export default async function Integrations() {
  return <DashboardIntegrationPage />;
}
