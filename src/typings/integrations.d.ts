import React from "react";
import { IntegrationAuth, IntegrationsTypes } from "./user";
import { APIRet, Override } from "./global";
import { NextApiRequest, NextApiResponse } from "next";

export type IntegrationInfo = {
  integrationName: IntegrationsTypes;
  description: string;
  status: boolean;
  action: React.ReactNode;
};

export type Integration = Omit<
  IntegrationInfo,
  "action" | "description" | "status"
> & {
  code: string;
};

export type IntegrationAPIRes = APIRet & {
  integration?: IntegrationsTypes;
  authUrl?: string;
  integrations?: Integration[];
};

export type IntegrationAPIReqQuery = {
  provider: IntegrationAuth;
  code?: string;  
};

export type IntegrationAPIReqBody = {};

export type IntegrationReqBody = IntegrationAPIReqQuery & IntegrationAPIReqBody;

export type IntegrationAPIReq = Override<
  NextApiRequest,
  {
    query: IntegrationAPIReqQuery;
    body: IntegrationAPIReqBody;
  }
>;

export type IntegrationAPIHandler = (
  req: IntegrationAPIReq,
  res: NextApiResponse<IntegrationAPIRes>
) => unknown;
