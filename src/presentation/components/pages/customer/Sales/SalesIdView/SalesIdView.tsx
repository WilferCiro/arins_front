"use client";
import { appConfig } from "@/data/config/app_config";
import { getStoresFormAdd, getStoresFormEdit } from "@/data/forms/stores.form";
import { getProductByStoreService } from "@/data/services/products.services";
import {
  addStoreService,
  editStoreService,
} from "@/data/services/stores.services";
import { getSaleTableDefinition } from "@/data/tables/sales_id.table";
import { getStoresTableDefinition } from "@/data/tables/stores.table";
import getDateString from "@/domain/adapters/getDateString";
import getFullDate from "@/domain/adapters/getFullDate";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { ProductSchema } from "@/domain/schemas/ProductSchema";
import { SaleTableSchema } from "@/domain/schemas/SaleIdSchema";
import { StoreSchema } from "@/domain/schemas/StoreSchema";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import BarcodeScanner from "@/presentation/components/atoms/BarcodeScanner";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import TableComponent from "@/presentation/components/molecules/TableComponent";
import CrudTable from "@/presentation/components/organisms/CrudTable";
import { useAuth } from "@/presentation/context/ContextAuth";
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  NumberInput,
  RingProgress,
  Select,
  Space,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconCash,
  IconDatabase,
  IconInfoCircle,
  IconTrash,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Column } from "react-table";
import { useZxing } from "react-zxing";

const store_id = "658a3fc50b60256c6b37daea";

const SalesIdView = () => {
  const { currentCompany } = useAuth();
  const [data, setDataTable] = useState<SaleTableSchema[]>([]);
  const columns = getSaleTableDefinition();
  const [opened, { open, close }] = useDisclosure(false);

  const {
    isError,
    data: products,
    isFetching,
  } = useQuery(
    [`products_by_store_id`, store_id],
    () => getProductByStoreService(store_id),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const addProduct = (value: string | null) => {
    if (!value) return;

    const existsProduct = products?.find((product) => product._id === value);
    if (!existsProduct) {
      notifications.show({
        title: "Error",
        message: "Este código de barras no existe",
      });
      return;
    }

    let newData = [...data];
    const copyData = [...data];
    const exists = copyData.findIndex((item) => item.product_id === value);
    if (exists !== -1) {
      copyData[exists].quantity = copyData[exists].quantity + 1;
      newData = copyData;
    } else {
      newData = [
        ...data,
        {
          product_id: existsProduct._id || "",
          product: existsProduct.name + " - " + existsProduct.barcode,
          price: existsProduct.price,
          quantity: 1,
        },
      ];
    }
    setDataTable(newData);
  };

  const onDecodeResult = (barcode: string) => {
    const exists = products?.find((product) => product.barcode === barcode);

    if (!exists) {
      notifications.show({
        title: "Error",
        message: "Este código de barras no existe",
      });
      return;
    }

    addProduct(exists._id || null);
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Resumen de la venta">
        <Card withBorder w={"100%"} mb="10">
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              {data.length}
            </Text>
            <Text ta="right">Productos</Text>
          </Flex>
        </Card>
        <Card withBorder w={"100%"} mb="20">
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              {getPriceFormat(
                data.reduce((accumulator, dt) => {
                  return dt.quantity * dt.price + accumulator;
                }, 0)
              )}
            </Text>
            <Text ta="right">Total</Text>
          </Flex>
        </Card>
        <Button>Guarda venta</Button>
      </Modal>

      <PageTitle
        title={"Nueva venta"}
        subtitle={`Genera una nueva venta para ${currentCompany?.name}`}
        icon={<IconCash />}
      />
      <Divider m="lg" />

      <Group>
        <Card withBorder w={"350px"}>
          <Select
            searchable
            clearable
            onChange={addProduct}
            placeholder="Selecciona el producto"
            data={(products || []).map((product) => {
              return {
                value: product._id || "",
                label: product.name + " - " + product.barcode,
              };
            })}
          />
        </Card>
        <BarcodeScanner onResult={onDecodeResult} />
      </Group>
      <Divider m="lg" />

      <TableComponent columns={columns} data={data} />

      <Group>
        <Card withBorder w={"250px"}>
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              {getPriceFormat(
                data.reduce((accumulator, dt) => {
                  return dt.quantity * dt.price + accumulator;
                }, 0)
              )}
            </Text>
            <Text ta="right">Total</Text>
          </Flex>
        </Card>
        <Button
          leftSection={<IconDatabase />}
          onClick={open}
          disabled={data.length === 0}
        >
          Ver resumen
        </Button>
      </Group>

      {/*<Group>
        <Card withBorder w={"250px"}>
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              $ 50.000,00
            </Text>
            <Text ta="right">Ventas</Text>
          </Flex>
        </Card>
        <Card withBorder w={"250px"}>
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              $ 50.000,00
            </Text>
            <Text ta="right">Pedidos</Text>
          </Flex>
        </Card>

        <Card withBorder w={"250px"}>
          <Flex direction={"column"}>
            <Text size="xl" fw={700}>
              $ 50.000,00
            </Text>
            <Text ta="right">Última venta</Text>
          </Flex>
        </Card>
              </Group>*/}
      <Space m="lg" />
    </>
  );
};

export default SalesIdView;
