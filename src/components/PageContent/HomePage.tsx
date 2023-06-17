"use client";
import { Container } from "@chakra-ui/react";
import {
  Auth,
  AuthForm,
  MagicLinkForm,
  PasswordForm,
  OtpForm,
  Providers,
  AutoForm,
  Fields,
  Card,
  CardBody,
} from "@saas-ui/react";
import React from "react";

export default function HomePage() {
  return (
    <Container mt="5rem">
      <Card title="Welcome!">
        <CardBody>
          <AuthForm  />
        </CardBody>
      </Card>
    </Container>
  );
}
