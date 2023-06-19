"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { SaasProvider } from "@saas-ui/react";

import theme from "@/lib/theme";
import { ColorModeScript, extendTheme } from "@chakra-ui/react";
import { Inter, Raleway } from "next/font/google";

import flagsmith from "flagsmith";
import { FlagsmithProvider } from "flagsmith/react";

// redux
import { store } from "@/redux/ reduxStore";
import { Provider } from "react-redux";
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
      <CacheProvider>
        <SaasProvider theme={BaseTheme}>
          <FlagsmithProvider
            options={{
              environmentID: process.env
                .NEXT_PUBLIC_FEATURE_FLAG_CLIENT_KEY as string,
            }}
            flagsmith={flagsmith}
          >
            <Provider store={store}>
              <ColorModeScript
                initialColorMode={BaseTheme.config.initialColorMode}
              />
              {children}
            </Provider>
          </FlagsmithProvider>
        </SaasProvider>
      </CacheProvider>
    </>
  );
}
