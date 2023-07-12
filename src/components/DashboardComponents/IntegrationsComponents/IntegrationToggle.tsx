"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { useIntegrationConnectionMutation } from "@/redux/services/auth";
import { IntegrationInfo } from "@/typings/integrations";
import { IntegrationStructure } from "@/typings/user";
import { Button } from "@chakra-ui/react";
import { ListItem, ListItemLabel, ListItemTertiary } from "@saas-ui/react";
import { useRouter } from "next/navigation";

export type IntegrationProps = {
  integration: Omit<IntegrationStructure, "id">;
};

export default function IntegrationToggle({ integration }: IntegrationProps) {
  const [connect] = useIntegrationConnectionMutation();

  const { user } = useAuthInfo();

  const { push } = useRouter();

  const integrations = user?.integrations;
  const googleCalendar = integrations?.find(
    (integration) => integration.integrationName === "Google Calendar"
  );

  const connectIntegration = async () => {
    try {
      switch (integration.name) {
        case "Google Calendar":
          if (!googleCalendar) {
            const res = await connect("google").unwrap();
            push(res?.authUrl as string);
          }

        default:
          break;
      }
    } catch (err) {}
  };

  const renderToggle = (): IntegrationInfo | null => {
    switch (integration.name) {
      case "Google Calendar":
        return {
          integrationName: "Google Calendar",
          description:
            "Automatically sync your Google Calendar with your appointments.",
          status: false,
          action: (
            <>
              <Button
                size="md"
                colorScheme={googleCalendar?.code ? "red" : "green"} 
                onClick={connectIntegration}
              >
                {googleCalendar?.code ? "Disconnect" : "Connect"}
              </Button>
            </>
          ),
        };

      default:
        return null;
    }
  };

  const toggle = renderToggle();

  if (!toggle) {
    return <></>;
  }

  return (
    <ListItem>
      <ListItemLabel
        primary={toggle?.integrationName}
        secondary={toggle?.description}
      />
      <ListItemTertiary>{toggle?.action}</ListItemTertiary>
    </ListItem>
  );
}
