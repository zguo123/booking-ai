"use client";

import { sampleServices } from "@/lib/consts/services";
import { formatPrice } from "@/lib/helpers/appointment";
import { DeleteIcon, EditIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Container,
  IconButton,
  ListItem,
  Stack,
  Text,
  List,
  Card,
  Heading,
  CardBody,
  HStack,
  Tag,
} from "@chakra-ui/react";

export default function DashboardServicesPage() {
  // convert the date to a string

  return (
    <Container maxW="container.xl">
      <List p={4} as={Stack} spacing={2}>
        {sampleServices.map((service) => (
          <ListItem as={Card} p={0} key={service.id}>
            <CardBody p={3} as={HStack} justifyContent="space-between">
              <Stack spacing={1}>
                <Tag size="sm" w="fit-content" colorScheme="primary">
                  {service.name}
                </Tag>

                <Text fontSize="sm" color="muted">
                  {service.description || "No description"}
                </Text>
              </Stack>
              <HStack spacing={4}>
                <Stack spacing={0}>
                  <Text fontSize="xl" fontWeight="bold" textAlign="right">
                    {formatPrice(service.price)}
                  </Text>
                  <Text fontSize="sm" color="muted" textAlign="right">
                    {service.duration} min
                  </Text>
                </Stack>
                <HStack spacing={2}>
                  <IconButton
                    size="lg"
                    aria-label="Edit service"
                    icon={<EditIcon />}
                  />{" "}
                  <IconButton
                    size="lg"
                    colorScheme="red"
                    aria-label="Delete service"
                    icon={<DeleteIcon />}
                  />
                </HStack>
              </HStack>
            </CardBody>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
