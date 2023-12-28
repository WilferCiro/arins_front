"use client";

// Nextjs y react
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

// web3

// Mantine
import { Card, Divider, Space, ThemeIcon } from "@mantine/core";
import { IconBrandGoogle, IconShieldCheck } from "@tabler/icons-react";
import { nprogress } from "@mantine/nprogress";

// Custom
import style from "./style.module.css";
import AsyncButton from "../../atoms/AsyncButton";
import AppLogo from "../../atoms/AppLogo";
import {
  LoginServiceProps,
  signInService,
} from "@/data/services/auth.services";
import GenericForm from "../GenericForm";
import { useContext, useMemo } from "react";
import { getLoginFormDefinition } from "@/data/forms/login.form";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { LoginSchema } from "@/domain/schemas/LoginSchema";
import { ContextAuth } from "@/presentation/context/ContextAuth";

const LoginForm = () => {
  const { login } = useContext(ContextAuth);
  const fieldsForm = useMemo(() => getLoginFormDefinition(), []);
  const { form } = useCustomForm<LoginSchema>(fieldsForm);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signInService,
    onSuccess: (result: { token: string } | null) => {
      if (result?.token) {
        login(result.token);
        router.push("/customer/");
      }
    },
  });

  const onFinish = async () => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (valid) {
      mutation.mutate(form.getValues() as LoginServiceProps);
    }
  };

  return (
    <>
      <Card className={style.form} radius="md">
        <div>
          <div className={style.image}>
            <AppLogo />
          </div>
          <Divider
            m="md"
            label={
              <ThemeIcon variant="light" color="secondary" size={"60px"}>
                <IconShieldCheck size={"40px"} />
              </ThemeIcon>
            }
          />
          <GenericForm form={form} fields={fieldsForm} />
          <div>
            <Space m={"lg"} />
            <AsyncButton
              fullWidth
              onClick={onFinish}
              label="Iniciar sesión"
              showError={true}
            />
            <Divider m="lg" label="Ó" />
            <AsyncButton
              fullWidth
              onClick={onFinish}
              label="Iniciar con google"
              showError={true}
              leftIcon={<IconBrandGoogle />}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default LoginForm;
