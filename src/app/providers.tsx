"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

import theme from "@/lib/theme";
import { Inter, Open_Sans, Raleway } from "next/font/google";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { theme as proTheme } from "@saas-ui/pro";

const inter = Inter({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });

const BaseTheme = extendTheme(
  {
    fonts: {
      heading: `${raleway.style.fontFamily}, sans-serif`,
      body: `${inter.style.fontFamily}, sans-serif`,
    },

    config: {
      initialColorMode: "system",
      useSystemColorMode: true,
    },
  },
  theme
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CacheProvider
        speedy
        insertionPoint={document.getElementById("__next")?.firstChild as any}
      >
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
