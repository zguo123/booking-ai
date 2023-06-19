"use client";
import { useFlags } from "flagsmith/react";
import React from "react";

export type FeatureFlagProps = {
  feature: string;
  children: React.ReactNode;
};

export default function FeatureFlag({ feature, children }: FeatureFlagProps) {
  const featureStatus = useFlags([feature]);


  return featureStatus[feature].enabled ? <>{children}</> : <></>;
}
