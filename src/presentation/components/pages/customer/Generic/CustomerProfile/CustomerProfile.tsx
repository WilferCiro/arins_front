"use client";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import styles from "./style.module.css";
import { IconCircleCheck } from "@tabler/icons-react";
import FormModal from "@/presentation/components/organisms/FormModal";
import { useDisclosure } from "@mantine/hooks";
import { useMemo } from "react";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsersFormEdit, getUsersFormEditPassword } from "@/data/forms/users.form";
import {
    editUserPassword,
  editUserService,
  getProfileDataService,
} from "@/data/services/users.services";
import { UserSchema } from "@/domain/schemas/UserSchema";
import { notifications } from "@mantine/notifications";

const CustomerProfile = () => {
  const queryClient = useQueryClient();
  const [openedFormData, { open: openFormData, close: closeFormData }] =
    useDisclosure(false);
  const [openedPassword, { open: openPassword, close: closePassword }] =
    useDisclosure(false);
  const fieldsFormData = useMemo(() => getUsersFormEdit(), []);
  const { form: formData } = useCustomForm(fieldsFormData);
  
  const fieldsFormPassword = useMemo(() => getUsersFormEditPassword(), []);
  const { form: formPassword } = useCustomForm(fieldsFormPassword);

  const { data: user, isLoading } = useQuery(
    [`profile_data`],
    () => getProfileDataService(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: editUserService,
    onSuccess: async (result: UserSchema | null) => {
      if (result) {
        await queryClient.refetchQueries([`profile_data`], {
          active: true,
        });
        notifications.show({
          color: "green",
          title: "Acción exitosa",
          message: `Se han editado tus datos exitosamente`,
        });
      }
    },
  });
  const mutationPassword = useMutation({
    mutationFn: editUserPassword,
    onSuccess: async (result: UserSchema | null) => {
      if (result) {
        notifications.show({
          color: "green",
          title: "Acción exitosa",
          message: `Se han editado la contraseña exitosamente`,
        });
      }
    },
  });

  const onAcceptFormData = async (): Promise<boolean> => {
    await formData.trigger();
    if (!formData.formState.isValid) {
      return false;
    }
    const data = await mutation.mutateAsync(formData.getValues());
    return !!data;
  };

  const onAcceptFormPassword = async (): Promise<boolean> => {
    await formPassword.trigger();
    if (!formPassword.formState.isValid) {
      return false;
    }
    const data = await mutationPassword.mutateAsync(formPassword.getValues());
    return !!data;
  };

  const onOpenEditUser = () => {
    openFormData();
    formData.reset(user);
  };

  if (isLoading) {
    return <>Cargando...</>;
  }

  return (
    <>
      <FormModal
        opened={openedFormData}
        onClose={closeFormData}
        onAccept={onAcceptFormData}
        fields={fieldsFormData}
        form={formData}
        title={"Editar mis datos"}
      />
      <FormModal
        opened={openedPassword}
        onClose={closePassword}
        onAccept={onAcceptFormPassword}
        fields={fieldsFormPassword}
        form={formPassword}
        title={"Editar mi contraseña"}
      />

      <div className={styles.container}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
              height={160}
              alt="Norway"
            />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text size="lg" fw={800}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Badge color="green">Activo</Badge>
          </Group>

          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Teléfono:</b> {user?.cellphone}
            </List.Item>
            <List.Item>
              <b>Email:</b> {user?.email}
            </List.Item>
          </List>

          <Divider m="lg" />

          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={onOpenEditUser}
          >
            Editar datos
          </Button>

          <Divider m="lg" />
          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={openPassword}
          >
            Editar contraseña
          </Button>
        </Card>
      </div>
    </>
  );
};

export default CustomerProfile;
