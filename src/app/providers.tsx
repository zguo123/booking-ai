"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

import theme from "@/lib/theme";
import { Inter } from "next/font/google";

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
        <SaasProvider theme={theme}>{children}</SaasProvider>
      </CacheProvider>
    </>
  );
}
