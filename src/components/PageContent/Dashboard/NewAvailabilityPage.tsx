"use client";
import AddAvailabilityForm from "@/components/DashboardComponents/AddAvailabilityForm";
import { Container } from "@chakra-ui/react";

export default function NewAvailabilityPage() {
  return (
    <Container maxW="container.lg" px={0} py={4}>
      <AddAvailabilityForm />
    </Container>
  );
}
