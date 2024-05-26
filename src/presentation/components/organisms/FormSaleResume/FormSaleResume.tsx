import { Box, Button, Card, Flex, Group, LoadingOverlay, Modal, Space, Tabs, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import TableComponent from "../../molecules/TableComponent";
import { getSalesOrderTableDefinition, getSalesTableResumeDefinition } from "@/data/tables/sale_resume.table";
import { useQuery } from "react-query";
import { exportInvoiceService, getCompleteSaleByIdService, getSaleByIdService } from "@/data/services/sales.services";
import CardInfo from "../../molecules/CardInfo";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { getTotalLastSale, getTotalOrders, getTotalSales } from "@/data/utils/sales.utils";

interface Props {
  saleId: string;
}

const FormSaleResume = ({
  saleId,
}: Props) => {

  const [
    opened,
    { open, close },
  ] = useDisclosure(false);

  const { data, isFetching, refetch } = useQuery(
    [`sale_id_id_modal_complete`, saleId],
    () => getCompleteSaleByIdService(saleId),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: opened
    }
  );

  const downloadInvoice = async (sale_id: string) => {
    await exportInvoiceService({ _id: saleId, sale_id });
    return true;
  }
  const columns = getSalesTableResumeDefinition({ downloadInvoice });

  useEffect(() => {
    if (opened) {
      refetch();
    }
  }, [opened, refetch]);

  console.log("render");

  return (
    <>
      <Button
        color={"secondary"}
        onClick={open}
      >
        Mostrar resumen del día
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={'Resumen del día'}
        size={"800px"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Flex gap="lg" w={"100%"}>
          <CardInfo value={data ? getPriceFormat(getTotalSales(data)) : ""} title={"Ventas"} loading={isFetching} />
          <CardInfo value={data ? getPriceFormat(getTotalOrders(data)) : ""} title={"Pedidos"} loading={isFetching} />
          <CardInfo value={data ? getPriceFormat(getTotalLastSale(data)) : ""} title={"Última venta"} loading={isFetching} />
        </Flex>
        <Tabs defaultValue="orders" variant="pills" orientation="vertical" mt="xxl">
          <Tabs.List>
            <Tabs.Tab value="orders">Pedidos</Tabs.Tab>
            <Tabs.Tab value="messages">Ventas</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="orders">
            <Box pos="relative">
              <LoadingOverlay visible={isFetching} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
              <TableComponent columns={getSalesOrderTableDefinition()} data={data?.orders || []} />
            </Box>
          </Tabs.Panel>
          <Tabs.Panel value="messages">
            <Box pos="relative">
              <LoadingOverlay visible={isFetching} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
              <TableComponent columns={columns} data={data?.sales || []} />
            </Box>
          </Tabs.Panel>
        </Tabs>

        <Space h="lg" />
        <Group justify="right" gap="sm">
          <Button
            color={"primary"}
            onClick={close}
          >
            Cerrar
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default FormSaleResume;
