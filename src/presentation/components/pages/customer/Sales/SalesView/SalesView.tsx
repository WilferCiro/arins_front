"use client";
import { appConfig } from "@/data/config/app_config";
import { getSalesFormAdd, getSalesFormFilter } from "@/data/forms/sales.form";
import { getStoresFormAdd } from "@/data/forms/stores.form";
import {
  addSaleService,
  exportSalesRowService,
  exportSalesService,
} from "@/data/services/sales.services";
import { addStoreService } from "@/data/services/stores.services";
import { getSalesTableDefinition } from "@/data/tables/sales.table";
import { getStoresTableDefinition } from "@/data/tables/stores.table";
import getDateString from "@/domain/adapters/getDateString";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { StoreSchema } from "@/domain/schemas/StoreSchema";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CardInfo from "@/presentation/components/molecules/CardInfo";
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
  const formAdd = useMemo(() => getSalesFormAdd(), []);
  const formFilter = useMemo(() => getSalesFormFilter(), []);
  const { currentCompany } = useAuth();

  const mutationAdd = useMutation({
    mutationFn: addSaleService,
  });
  const mutationExport = useMutation({
    mutationFn: exportSalesService,
  });
  const mutationExportRow = useMutation({
    mutationFn: exportSalesRowService,
  });

  const onExportRow = async (_id: string) => {
    const res = await mutationExportRow.mutateAsync(_id);
    return res !== null;
  };
  const columns = getSalesTableDefinition({ onExportRow });

  const onAdd = async (values: SaleSchema) => {
    const res = await mutationAdd.mutateAsync(values);
    return res !== null;
  };

  const onExport = async (
    filters: Record<string, string> | undefined
  ): Promise<boolean> => {
    const res = await mutationExport.mutateAsync(filters);
    return res !== null;
  };

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
          <Text fw={500}>Día </Text>
          <Badge color="green">Abierta</Badge>
        </Group>

        <Group align="center" justify="stretch">
          <div>
            <CardInfo value={"0"} title={"Productos"} />
          </div>
          <Divider orientation="vertical" />
          <div>
            <CardInfo value={"5"} title={"Pedidos"} />
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
          onExport: onExport,
        }}
      />
    </>
  );
};

export default SalesView;
