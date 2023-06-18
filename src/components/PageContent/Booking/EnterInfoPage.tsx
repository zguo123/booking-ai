"use client";

import { Heading, Stack, Text } from "@chakra-ui/react";

export default function EnterInfoPage() {
  return (
    <Stack pb={4}>
      <Stack spacing={3} pt={10}>
        <Heading size="2xl" textAlign="center">
          Enter your information
        </Heading>{" "}
        <Text fontSize="xl" color="muted" textAlign="center">
          Please enter your information below
        </Text>{" "}
      </Stack>{" "}
    </Stack>
  );
}
