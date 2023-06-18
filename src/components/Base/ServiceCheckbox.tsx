import { ServiceProps } from "@/typings/service";
import {
  HStack,
  Heading,
  Stack,
  Text,
  UseCheckboxProps,
  useCheckbox,
} from "@chakra-ui/react";
import { Card, CardBody } from "@saas-ui/react";

export type ServiceCheckboxProps = UseCheckboxProps & ServiceProps;
export default function ServiceCheckbox({
  name,
  description,
  price,
  duration,
  ...props
}: ServiceCheckboxProps) {
  const { state, getCheckboxProps, getInputProps } = useCheckbox(props);

  return (
    <Card
      borderColor={state.isChecked ? "purple.500" : "auto"}
      _hover={{
        borderColor: "purple.500",
      }}
      p={3}
      as={"label"}
      cursor="pointer"
    >
      <CardBody
        justifyContent="space-between"
        as={HStack}
        spacing={6}
        {...getCheckboxProps}
      >
        <input {...getInputProps()} hidden />

        <Stack>
          <Heading as="h1" size="lg">
            {name}
          </Heading>
          <Text wordBreak="break-word" fontSize="lg" color="muted">
            {description}
          </Text>
        </Stack>
        <Stack spacing={0} textAlign="right">
          <Text fontWeight="bold" fontSize="3xl">
            ${price}
          </Text>
          <Text isTruncated fontSize="lg" color="muted">
            {duration} min
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
