"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { createAuthService } from "@saas-ui/auth/services/magic-link";
import { AuthProvider, SaasProvider } from "@saas-ui/react";

import theme from "@/lib/theme";
import { Inter } from "next/font/google";
import { magic } from "@/lib/magic";

const inter = Inter({ subsets: ["latin"] });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
          }
        `}
      </style>
      <CacheProvider>
        <SaasProvider theme={theme}>
          <AuthProvider {...createAuthService(magic)}>{children}</AuthProvider>
        </SaasProvider>
      </CacheProvider>
    </>
  );
}
