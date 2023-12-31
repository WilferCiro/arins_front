"use client";
import { appConfig } from "@/data/config/app_config";
import { getStoresFormAdd, getStoresFormEdit } from "@/data/forms/stores.form";
import {
  addStoreService,
  editStoreService,
} from "@/data/services/stores.services";
import { getStoresTableDefinition } from "@/data/tables/stores.table";
import getDateString from "@/domain/adapters/getDateString";
import getFullDate from "@/domain/adapters/getFullDate";
import { StoreSchema } from "@/domain/schemas/StoreSchema";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { useAuth } from "@/presentation/context/ContextAuth";
import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Space,
  Text,
} from "@mantine/core";
import { IconCash, IconInfoCircle } from "@tabler/icons-react";
import { useMemo } from "react";
import { useMutation } from "react-query";

const SalesView = () => {
  const columns = useMemo(() => getStoresTableDefinition(), []);
  const formAdd = useMemo(() => getStoresFormAdd(), []);
  const formEdit = useMemo(() => getStoresFormEdit(), []);

  const mutationAdd = useMutation({
    mutationFn: addStoreService,
  });
  const mutationEdit = useMutation({
    mutationFn: editStoreService,
  });

  const onAdd = async (values: StoreSchema) => {
    values.active = true;
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onEdit = async (original: StoreSchema, values: StoreSchema) => {
    values._id = original._id;
    const res = await mutationEdit.mutateAsync(values);
    return res !== null;
  };
  const { currentCompany } = useAuth();
  return (
    <>
      <PageTitle
        title={"Listado de ventas"}
        subtitle={`Administra las ventas de ${currentCompany?.name}`}
        icon={<IconCash />}
      />
      <Divider m="lg" />

      <Card shadow="sm" padding="lg" radius="md" withBorder w={"500px"}>
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>Día {getDateString(new Date())}</Text>
          <Badge color="green">Abierta</Badge>
        </Group>

        <Group align="cente">
          <div>
            <Text>Ventas</Text>
            <Text>20</Text>
          </div>
          <Divider orientation="vertical" />
          <div>
            <Text>Pedidos</Text>
            <Text>5</Text>
          </div>
        </Group>

        <Button color="blue" fullWidth mt="md" radius="md">
          Continuar con las ventas del día
        </Button>
      </Card>
      <Space m="lg" />

      <CrudTable<StoreSchema>
        columns={columns}
        endpoint={"stores"}
        server={appConfig.API_BACKEND_URL}
        fieldsForms={{
          add: formAdd,
          edit: formEdit,
        }}
        actions={{
          onAdd: onAdd,
          onEdit: onEdit,
        }}
      />
    </>
  );
};

export default SalesView;
