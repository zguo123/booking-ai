import { extendTheme } from "@chakra-ui/react";
import { theme as proTheme } from "@saas-ui/pro";

const theme = extendTheme(
  {
    fonts: {
      heading: "var(--font-rubik)",
      body: "var(--font-rubik)",
    },
    config: {
      initialColorMode: "system",
      useSystemColorMode: true,
    },
  },
  proTheme
);

export default theme;
