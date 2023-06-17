// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <SaasProvider>{children}</SaasProvider>
    </CacheProvider>
  );
}
