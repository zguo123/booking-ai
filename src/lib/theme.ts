import { extendTheme } from "@chakra-ui/react";
import { theme as proTheme } from "@saas-ui/pro";

const theme = extendTheme(
  {
    styles: {
      global: {
        "html, body": {
          height: "100%",
        },
      },
    },

    fonts: {
      heading: "var(--font-raleway)",
      body: "var(--font-inter)",
    },
    config: {
      initialColorMode: "system",
      useSystemColorMode: true,
    },
  },
  proTheme
);

export default theme;
