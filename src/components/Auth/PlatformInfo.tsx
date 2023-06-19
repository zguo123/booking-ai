"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function PlatformInfo() {
  const { authUser, user } = useAuthInfo();

  return (
    <Button w="full" as={Link} href="/login" variant="secondary">
      Login
    </Button>
  );
}
