"use client";
import { Container } from "@chakra-ui/react";
import { Card, CardBody } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import AuthenticateForm from "../Auth/AuthenticateForm";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <Container mt="5rem">
        <Card title="Welcome!">
          <CardBody>
            <AuthenticateForm />
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
