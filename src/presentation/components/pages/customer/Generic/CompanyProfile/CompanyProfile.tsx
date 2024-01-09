"use client";

import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Image,
  List,
  SimpleGrid,
  Text,
  ThemeIcon,
  rem,
} from "@mantine/core";
import styles from "./style.module.css";
import { CompanySchema } from "@/domain/schemas/CompanySchema";
import { IconCircleCheck } from "@tabler/icons-react";
import FormModal from "@/presentation/components/organisms/FormModal";
import { useDisclosure } from "@mantine/hooks";
import { getCompaniesFormEdit } from "@/data/forms/companies.form";
import { useMemo } from "react";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  editCompanyService,
  getCurrentCompanyDataService,
} from "@/data/services/companies.services";
import getDateTimeString from "@/domain/adapters/getDateTimeString";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { notifications } from "@mantine/notifications";

const CompanyProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const fieldsForm = useMemo(() => getCompaniesFormEdit(), []);
  const queryClient = useQueryClient();
  const { form } = useCustomForm(fieldsForm);

  const { data: company, isLoading } = useQuery(
    [`current_company_data`],
    () => getCurrentCompanyDataService(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const mutation = useMutation({
    mutationFn: editCompanyService,
    onSuccess: async (result: CompanySchema | null) => {
      if (result) {
        await queryClient.refetchQueries([`current_company_data`], {
          active: true,
        });
        notifications.show({
          color: "green",
          title: "Acción exitosa",
          message: `Se han editado la compañía exitosamente`,
        });
      }
    },
  });

  const openModal = () => {
    open();
    form.reset(company);
  };

  const onAccept = async (): Promise<boolean> => {
    await form.trigger();
    if (!form.formState.isValid) {
      return false;
    }
    const data = await mutation.mutateAsync(form.getValues());
    return !!data;
  };
  
  if (isLoading) {
    return <>Cargando</>;
  }

  return (
    <>
      <FormModal
        opened={opened}
        onClose={close}
        onAccept={onAccept}
        fields={fieldsForm}
        form={form}
        title={"Editar compañía"}
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
              {company?.name}
            </Text>
            <Badge color="green">Activa</Badge>
          </Group>

          <Text mb="md">{company?.type}</Text>

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
              <b>Nit:</b> {company?.nit}
            </List.Item>
            <List.Item>
              <b>Dirección:</b> {company?.address}
            </List.Item>
            <List.Item>
              <b>Email:</b> {company?.email}
            </List.Item>
          </List>

          <Divider m="lg" />
          <Text mb="md" size="lg" fw="bold">
            Accesos
          </Text>
          <Card.Section inheritPadding pb="md">
            <SimpleGrid cols={3}>
              <Card withBorder>
                <Text size="md" fw="bold">
                  Inventarios
                </Text>
                {!company?.access?.inventory?.active ? (
                  <Badge color="red">Inactiva</Badge>
                ) : (
                  <>
                    <Text size="sm">
                      {getDateTimeString(
                        company?.access?.inventory?.expiration
                      )}
                    </Text>
                    <Text size="sm">
                      {getPriceFormat(company?.access?.inventory?.price)}
                    </Text>
                    <Badge color="green">Activa</Badge>
                  </>
                )}
              </Card>
              <Card withBorder>
                <Text size="md" fw="bold">
                  Ventas
                </Text>
                {!company?.access?.sales?.active ? (
                  <Badge color="red">Inactiva</Badge>
                ) : (
                  <>
                    <Text size="sm">
                      {getDateTimeString(company?.access?.sales?.expiration)}
                    </Text>
                    <Text size="sm">
                      {getPriceFormat(company?.access?.sales?.price)}
                    </Text>
                    <Badge color="green">Activa</Badge>
                  </>
                )}
              </Card>
              <Card withBorder>
                <Text size="md" fw="bold">
                  Ingreso
                </Text>
                {!company?.access?.entry?.active ? (
                  <Badge color="red">Inactiva</Badge>
                ) : (
                  <>
                    <Text size="sm">
                      {getDateTimeString(company?.access?.entry?.expiration)}
                    </Text>
                    <Text size="sm">
                      {getPriceFormat(company?.access?.entry?.price)}
                    </Text>
                    <Badge color="green">Activa</Badge>
                  </>
                )}
              </Card>
            </SimpleGrid>
          </Card.Section>

          <Divider m="lg" />

          <Button
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={openModal}
          >
            Editar datos
          </Button>
        </Card>
      </div>
    </>
  );
};

export default CompanyProfile;
