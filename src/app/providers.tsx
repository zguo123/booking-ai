"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

import theme from "@/lib/theme";
import { ColorModeScript, extendTheme } from "@chakra-ui/react";
import { Inter, Raleway } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

const BaseTheme = extendTheme(
  {
    fonts: {
      heading: `${raleway.style.fontFamily}, sans-serif`,
      body: `${inter.style.fontFamily}, sans-serif`,
    },
  },
  theme
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CacheProvider speedy>
        <SaasProvider resetCSS theme={BaseTheme}>
          <ColorModeScript
            initialColorMode={BaseTheme.config.initialColorMode}
          />
          {children}
        </SaasProvider>
      </CacheProvider>
    </>
  );
}
