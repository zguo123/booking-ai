"use client";

import useAuthInfo from "@/hooks/useAuthInfo";
import { CopyIcon } from "@chakra-ui/icons";
import { Button, HStack, Skeleton, useClipboard } from "@chakra-ui/react";
import { useModals, useSnackbar, Card, CardBody } from "@saas-ui/react";
import Link from "next/link";
import FeatureFlag from "../Base/FeatureFlag";

export default function AppointLink() {
  const modals = useModals();

  const snackbar = useSnackbar();

  const host =
    typeof window !== "undefined" &&
    `${window.location.protocol}//${window.location.host}`;

  const { user, isLoading: isAuthLoading } = useAuthInfo();

  const { onCopy, value, hasCopied } = useClipboard(`
    ${host}/book/${user?._id}`);

  const copyLink = () => {
    onCopy();
  };

  if (hasCopied) {
    snackbar.success({
      title: "Copied Booking Link",
      description: "Your booking link has been copied to your clipboard.",
      action: (
        <Button variant="subtle" as={Link} href={value}>
          Preview
        </Button>
      ),
    });
  }

  return (
    <FeatureFlag feature="create_appointment_link">
      {" "}
      <Skeleton isLoaded={!isAuthLoading && !!host}>
        <HStack>
          <Card
            display={{
              base: "none",
              lg: "block",
            }}
          >
            <CardBody
              maxW={{
                base: "5rem",
                lg: "12rem",
              }}
              isTruncated
              px={2}
              py={1.5}
            >
              {value}
            </CardBody>
          </Card>
          <Button
            onClick={() => copyLink()}
            leftIcon={<CopyIcon />}
            variant="solid"
            colorScheme="primary"
          >
            Copy Link
          </Button>
        </HStack>{" "}
      </Skeleton>
    </FeatureFlag>
  );
}
