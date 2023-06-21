"use client";

import { useLazySearchUserQuery } from "@/redux/services/user";
import { IUserItems, UserSearchResult } from "@/typings/user";
import { Center, Container, Stack } from "@chakra-ui/react";
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@saas-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { useRouter } from "next/navigation";

export default function SearchBookingSitePage() {
  const [
    searchUser,
  ] = useLazySearchUserQuery();

  const router = useRouter();

  return (
    <Center height="100vh">
      <Container>
        <Stack spacing="8">
          <Card>
            <CardHeader>
              <Stack spacing={0.5}>
                <CardTitle>Search Booking Site</CardTitle>
                <CardSubtitle>
                  If you have a booking site, you can search for it here.
                </CardSubtitle>
              </Stack>
            </CardHeader>
            <CardBody as={Stack} spacing={"10"} px={4} textAlign="center">
              <AsyncSelect
                useBasicStyles
                size="lg"
                name="username-select"
                colorScheme="primary"
                onChange={(value) => {
                  const result = value as UserSearchResult;
                  router.push(`/book/${result?.value}`);
                }}
                placeholder="Search for a username"
                loadOptions={(value, callback) => {
                  searchUser(value)
                    .unwrap()
                    .then((data) => {
                      const searchData = data?.users as IUserItems[];
                      callback(
                        searchData?.map((user) => ({
                          label: user?.username,
                          value: user?._id,
                        }))
                      );
                    });
                }}
              />
            </CardBody>
          </Card>
        </Stack>
      </Container>{" "}
    </Center>
  );
}
