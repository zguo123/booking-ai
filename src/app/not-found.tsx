import NotFoundPage from "@/components/Base/NotFoundPage";
import { ErrorBoundary } from "@saas-ui/pro";
import { EmptyState } from "@saas-ui/react";

export const metadata = {
  title: "404 | Not Found",
};

export default function NotFound() {
  return <NotFoundPage />;
}
