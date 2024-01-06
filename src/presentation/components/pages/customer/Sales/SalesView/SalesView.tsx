"use client";
import { appConfig } from "@/data/config/app_config";
import { getSalesFormAdd, getSalesFormFilter } from "@/data/forms/sales.form";
import {
  addSaleService,
  exportSalesRowService,
  exportSalesService,
  getActiveSalesService,
} from "@/data/services/sales.services";
import { getSalesTableDefinition } from "@/data/tables/sales.table";
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
import { IconArrowRight, IconCash } from "@tabler/icons-react";
import Link from "next/link";
import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";

interface Props {
  stores: StoreSchema[] | null;
}

const SalesView = ({ stores }: Props) => {
  const formAdd = useMemo(() => getSalesFormAdd(), []);
  const formFilter = useMemo(
    () => getSalesFormFilter({ stores: stores || [] }),
    [stores]
  );

  const { data: salesData, isFetching } = useQuery(
    [`sale_active_id`],
    () => getActiveSalesService(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

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

      <Group>
        {(salesData || []).map((sale) => {
          return (
            <Card
              shadow="sm"
              padding="sm"
              radius="md"
              w={"350px"}
              key={sale.store._id}
            >
              <Group justify="space-between" mt="md" mb="xs">
                <div>
                  <Text fw={700} size="md">
                    {sale.store.name}
                  </Text>
                  <Text fw={300} size="sm">
                    Día {getDateString(new Date())}
                  </Text>
                </div>
                {sale.active ? (
                  <Badge color="green">Abierta</Badge>
                ) : (
                  <Badge color="blue">Cerrada</Badge>
                )}
              </Group>

              {sale.sale ? (
                <Link href={`/customer/sales/${sale.sale}`}>
                  <Button
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    rightSection={<IconArrowRight />}
                  >
                    Continuar con las ventas del día
                  </Button>
                </Link>
              ) : (
                <>Crea la venta del día en la tabla</>
              )}
            </Card>
          );
        })}
      </Group>
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
