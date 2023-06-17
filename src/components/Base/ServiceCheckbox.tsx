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
  const {
    state,
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    htmlProps,
  } = useCheckbox(props);

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
        w="full"
        justifyContent="space-between"
        as={HStack}
        {...getCheckboxProps}
      >
        <input {...getInputProps()} hidden />

        <Stack>
          <Heading as="h1" size="lg">
            {name}
          </Heading>
          <Text
            maxW={{
              base: "80%",
              lg: "full",
            }}
            isTruncated
            fontSize="lg"
            color="muted"
          >
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
