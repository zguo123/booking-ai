import { magic } from "@/lib/magic";
import { useLoginMutation } from "@/redux/services/auth";
import { useBoolean } from "@chakra-ui/react";
import {
  Field,
  Form,
  FormLayout,
  SubmitButton,
  useFormContext,
} from "@saas-ui/react";
import { useRouter } from "next/navigation";
import validator from "validator";

export default function AuthenticateForm() {
  const router = useRouter();

  const [login, { data, error }] = useLoginMutation();

  const [isSubmitting, setIsSubmitting] = useBoolean(false);

  const onSubmit = async (params: { email: string }) => {
    const { email } = params;
    setIsSubmitting.on();

    try {
      let didToken = await magic?.auth.loginWithEmailOTP({
        email,
      });

      const res = await login(didToken as string).unwrap();

      if (res.success) {
        router.push("/dashboard");
        setIsSubmitting.off();
      }
    } catch (err) {
      setIsSubmitting.off();
    }
  };
  return (
    <Form
      defaultValues={{
        email: "",
      }}
      onSubmit={onSubmit}
    >
      <FormLayout spacing={5}>
        <Field
          name="email"
          label="Email"
          size="lg"
          type="email"
          placeholder="Email"
          isRequired
          rules={{
            required: "Email is required",
            validate: (value: string) => {
              if (!validator.isEmail(value)) return "Email is invalid";
            },
          }}
        />{" "}
        <SubmitButton
          variant="solid"
          colorScheme="primary"
          w="full"
          size="lg"
          isLoading={isSubmitting}
          disableIfInvalid
        >
          Continue with Email
        </SubmitButton>
      </FormLayout>
    </Form>
  );
}
