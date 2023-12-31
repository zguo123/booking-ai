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
import {
  Card,
  CardBody
} from "@saas-ui/react";
import Link from "next/link";
export default function HomePage() {
  return (
    <Center height="100vh">
      <Container>
        <Stack spacing="8">
          <Card>
            <CardBody as={Stack} spacing={"10"} p={10} textAlign="center">
              <Stack spacing={2}>
                <Heading fontWeight="bold" size="xl" as="h1">
                  Welcome
                </Heading>{" "}
                <Text color="muted" fontSize="xl">
                  How would you like to get started?
                </Text>
              </Stack>
              <ButtonGroup size="md" w="full">
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
