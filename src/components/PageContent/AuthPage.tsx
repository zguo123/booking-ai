"use client";
import { Center, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { CardHeader, Card, CardBody } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import AuthenticateForm from "../Auth/AuthenticateForm";

export default function HomePage() {
  return (
    <>
      <Container as={Center} h="full">
        <Card p={5}>
          <CardHeader>
            <Stack spacing={1}>
              <Heading
                flexDir="column"
                w={{
                  base: "full",
                  lg: "md",
                }}
                textAlign="center"
                size="xl"
              >
                Welcome Back!
              </Heading>
            </Stack>
          </CardHeader>
          <CardBody>
            <AuthenticateForm />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
