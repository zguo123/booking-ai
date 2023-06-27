import { googleCalendar } from "@/lib/initIntegrations";
import { IntegrationInfo } from "@/typings/integrations";
import { IntegrationStructure } from "@/typings/user";
import { Button, Switch } from "@chakra-ui/react";
import { ListItem, ListItemLabel, ListItemTertiary } from "@saas-ui/react";

export type IntegrationProps = {
  integration: Omit<IntegrationStructure, "id">;
};

export default function IntegrationToggle({ integration }: IntegrationProps) {
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
                colorScheme={"blue"}
                onClick={() => {
                  googleCalendar.handleAuthClick();
                }}
                size="md"
              >
                {"Connect"}
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
