"use client";
import useAuthInfo from "@/hooks/useAuthInfo";
import { useCreateServiceMutation } from "@/redux/services/service";
import { ServiceRequestBody } from "@/typings/service";
import { Button, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { FormDialog } from "@saas-ui/modals";
import {
  Field,
  FormLayout,
  SubmitButton,
  UseFormReturn,
  useSnackbar,
} from "@saas-ui/react";
import React from "react";
import FeatureFlag from "../Base/FeatureFlag";

export default function CreateServiceForm() {
  const formRef = React.useRef<UseFormReturn>(null);
  const disclosure = useDisclosure();

  const snackbar = useSnackbar();

  const { user } = useAuthInfo();

  const [createService, { error, isLoading }] = useCreateServiceMutation();

  const onSubmit = async (data: ServiceRequestBody) => {
    try {
      const res = await createService({
        ...data,
        userId: user?._id as string,
      }).unwrap();

      if (res.success) {
        snackbar({
          title: `Service created with ${data?.name}`,
          description: "Your service has been created",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        disclosure.onClose();
      }
    } catch (error) {
      const err = error as { [key: string]: string };

      Object.keys(err).forEach((key: string) => {
        formRef.current?.setError(key, {
          type: "custom",
          message: err[key as string] as string,
        });
      });
    }
  };
  const footer = (
    <ModalFooter>
      <SubmitButton
        isLoading={isLoading}
        disableIfUntouched
        disableIfInvalid
        w="full"
        size="md"
      >
        Create service
      </SubmitButton>
    </ModalFooter>
  );

  return (
    <>
      <FeatureFlag feature="add_service">
        <Button
          onClick={() => disclosure.onOpen()}
          variant="solid"
          colorScheme="primary"
        >
          Add Service
        </Button>
      </FeatureFlag>
      <FormDialog
        ref={formRef}
        title="New Service"
        footer={footer}
        onSubmit={(value) => onSubmit(value as ServiceRequestBody)}
        {...disclosure}
      >
        <FormLayout>
          <Field
            name="name"
            size="md"
            label="Name"
            help="A unique service name"
            isRequired
            rules={{
              required: "A service name is required",
            }}
          />{" "}
          <Field
            name="description"
            size="md"
            type="textarea"
            label="Description"
          />{" "}
          <Field
            type="number"
            name="price"
            size="md"
            label="Price"
            rules={{
              required: "Price is required",
            }}
            isRequired
          />{" "}
          <Field
            type="number"
            name="duration"
            size="md"
            label="Duration (in minutes)"
            rules={{
              required: "Duration is required",
            }}
            isRequired
          />
        </FormLayout>
      </FormDialog>
    </>
  );
}
