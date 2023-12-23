"use client";

// Nextjs y react
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useMutation } from "react-query";

// web3
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { disconnect } from "@wagmi/core";
import { useAccount, useConnect } from "wagmi";
import detectEthereumProvider from "@metamask/detect-provider";

// Mantine
import { Button, Card, Divider, List, Space, ThemeIcon } from "@mantine/core";
import {
  IconBrandGoogle,
  IconCheck,
  IconHelp,
  IconShieldCheck,
} from "@tabler/icons-react";
import { nprogress } from "@mantine/nprogress";
import { notifications } from "@mantine/notifications";

// Custom
import style from "./style.module.css";
import AsyncButton from "../../atoms/AsyncButton";
import AppLogo from "../../atoms/AppLogo";
import { signInService } from "@/data/services/auth.services";
import { checkIsAdmin } from "@/domain/utils/auth.utils";
import GenericForm from "../GenericForm";
import { useMemo } from "react";
import { getLoginFormDefinition } from "@/data/forms/login.form";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { LoginSchema } from "@/domain/schemas/LoginSchema";

const LoginForm = () => {
  const fieldsForm = useMemo(() => getLoginFormDefinition(), []);
  const { form } = useCustomForm<LoginSchema>(fieldsForm);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signInService,
    onError: (error: { message: string }) => {
      notifications.show({
        color: "red",
        message: error?.message,
      });
    },
  });

  const onFinish = async () => {
    router.push("/admin");
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
