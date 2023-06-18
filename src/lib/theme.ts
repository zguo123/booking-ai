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

    config: {
      initialColorMode: "dark",
      useSystemColorMode: true,
    },
  },
  proTheme
);

export default theme;
