"use client";

// Nextjs y react
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

// web3

// Mantine
import { Button, Card, Divider, Space, ThemeIcon } from "@mantine/core";
import { IconDoorEnter, IconShieldCheck } from "@tabler/icons-react";

// Custom
import style from "./style.module.css";
import AsyncButton from "../../atoms/AsyncButton";
import AppLogo from "../../atoms/AppLogo";
import {
  LoginServiceProps,
  SignUpServiceProps,
  signInService,
  signUpService,
} from "@/data/services/auth.services";
import GenericForm from "../GenericForm";
import { useContext, useMemo } from "react";
import { getSignupFormDefinition } from "@/data/forms/login.form";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { LoginSchema } from "@/domain/schemas/LoginSchema";
import { ContextAuth } from "@/presentation/context/ContextAuth";
import Link from "next/link";

const SignUpForm = () => {
  const { login } = useContext(ContextAuth);
  const fieldsForm = useMemo(() => getSignupFormDefinition(), []);
  const { form } = useCustomForm<LoginSchema>(fieldsForm);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signUpService,
    onSuccess: (result: { token: string } | null) => {
      if (result?.token) {
        login(result.token);
        router.push("/customer/");
      }
    },
  });

  const onFinish = async (): Promise<boolean> => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (valid) {
      await mutation.mutateAsync(form.getValues() as SignUpServiceProps);
    }
    return true;
  };

  return (
    <>
      <Card className={style.form} radius="md">
        <div>
          <div className={style.image}>
            <AppLogo />
          </div>
          <Space p="md" />
          <h2>Registrarme en Arins</h2>
          <Space p="md" />
          <GenericForm form={form} fields={fieldsForm} />
          <div>
            <Space m={"lg"} />
            <AsyncButton
              fullWidth
              onClick={onFinish}
              label="Registrarme"
              showError={true}
            />
            <Divider m="lg" label="Ó" />
            <Link href="/login">
              <Button fullWidth leftSection={<IconDoorEnter />} variant="light">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SignUpForm;
