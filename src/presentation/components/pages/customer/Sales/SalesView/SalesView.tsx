"use client";
import { appConfig } from "@/data/config/app_config";
import { getSalesFormAdd, getSalesFormFilter } from "@/data/forms/sales.form";
import { getStoresFormAdd } from "@/data/forms/stores.form";
import { addSaleService } from "@/data/services/sales.services";
import { addStoreService } from "@/data/services/stores.services";
import { getSalesTableDefinition } from "@/data/tables/sales.table";
import { getStoresTableDefinition } from "@/data/tables/stores.table";
import getDateString from "@/domain/adapters/getDateString";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { StoreSchema } from "@/domain/schemas/StoreSchema";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { useAuth } from "@/presentation/context/ContextAuth";
import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Space,
  Text,
} from "@mantine/core";
import { IconCash } from "@tabler/icons-react";
import { useMemo } from "react";
import { useMutation } from "react-query";

const SalesView = () => {
  const columns = useMemo(() => getSalesTableDefinition(), []);
  const formAdd = useMemo(() => getSalesFormAdd(), []);
  const formFilter = useMemo(() => getSalesFormFilter(), []);

  const mutationAdd = useMutation({
    mutationFn: addSaleService,
  });

  const onAdd = async (values: SaleSchema) => {
    const res = await mutationAdd.mutateAsync(values);
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

      <CrudTable<SaleSchema>
        columns={columns}
        endpoint={"sales"}
        server={appConfig.API_BACKEND_URL}
        filterForm={formFilter}
        fieldsForms={{
          add: formAdd,
        }}
        actions={{
          onAdd: onAdd,
        }}
      />
    </>
  );
};

export default SalesView;
