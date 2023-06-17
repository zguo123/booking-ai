"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

import theme from "@/lib/theme";
import { Inter, Open_Sans, Raleway } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-raleway: ${raleway.style.fontFamily};
            --font-open-sans: ${openSans.style.fontFamily};
          }
        `}
      </style>
      <CacheProvider>
        <SaasProvider theme={theme}>{children}</SaasProvider>
      </CacheProvider>
    </>
  );
}
