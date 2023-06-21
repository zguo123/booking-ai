"use client";

import {
  Button,
  ButtonGroup,
  Center,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Card, CardBody, CardHeader, CardTitle } from "@saas-ui/react";
import Link from "next/link";
export default function SearchBookingSitePage() {
  return (
    <Center height="100vh">
      <Container>
        <Stack spacing="8">
          <Card>
            <CardHeader>
              <CardTitle fontSize="xl">Search for a booking site.</CardTitle>
            </CardHeader>{" "}
            <CardBody as={Stack} spacing={"10"} p={10} textAlign="center">
              <Stack spacing={2}></Stack>
              <ButtonGroup size="lg" w="full">
                <Button w="full" as={Link} href="/login" variant="secondary">
                  Login
                </Button>
                <Button as={Link} href="/book" w="full" colorScheme="blue">
                  Book New Session
                </Button>
              </ButtonGroup>
            </CardBody>
          </Card>
        </Stack>
      </Container>{" "}
    </Center>
  );
}
