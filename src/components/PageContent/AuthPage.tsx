"use client";
import { Center, Container, Heading } from "@chakra-ui/react";
import { CardHeader, Card, CardBody } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import AuthenticateForm from "../Auth/AuthenticateForm";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Container as={Center} h="full">
        <Card p={4}>
          <CardHeader justifyContent="center">
            <Heading w="md" textAlign="center" size="lg">
              Welcome to Booking AI
            </Heading>
          </CardHeader>
          <CardBody>
            <AuthenticateForm />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
