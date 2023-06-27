import React from "react";
import { IntegrationsTypes } from "./user";

export type IntegrationInfo = {
  integrationName: IntegrationsTypes;
  description: string;
  status: boolean;
  action: React.ReactNode;
};
