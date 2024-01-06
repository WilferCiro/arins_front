"use client";
import { getProductByStoreService } from "@/data/services/products.services";
import {
  createSaleSaleService,
  getSaleByIdService,
} from "@/data/services/sales.services";
import { getSaleTableDefinition } from "@/data/tables/sales_id.table";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import BarcodeScanner from "@/presentation/components/atoms/BarcodeScanner";
import PageTitle from "@/presentation/components/atoms/PageTitle";
import CardInfo from "@/presentation/components/molecules/CardInfo";
import TableComponent from "@/presentation/components/molecules/TableComponent";
import CardSummarySale from "@/presentation/components/organisms/CardSummarySale";
import OrderFormAdd from "@/presentation/components/organisms/OrderFormAdd";
import { useAuth } from "@/presentation/context/ContextAuth";
import useSaleView from "@/presentation/hooks/useSaleView";
import {
  Card,
  Divider,
  Flex,
  Group,
  Select,
  Skeleton,
  Space,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCash } from "@tabler/icons-react";
import { useRef } from "react";
import { useMutation, useQuery } from "react-query";

interface Props {
  sale_id: string;
}

const SalesIdView = ({ sale_id }: Props) => {
  const { currentCompany } = useAuth();
  const refSelect = useRef<HTMLInputElement>(null);
  const { data: saleData, isFetching } = useQuery(
    [`sale_id_id`, sale_id],
    () => getSaleByIdService(sale_id),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const { data: products, isFetching: isFetchingProducts } = useQuery(
    [`products_by_store_id`, saleData?.store_id],
    () => getProductByStoreService(saleData?.store_id || ""),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!saleData?.store,
    }
  );

  const { dataTable, deleteDataTableRow, addProduct, emptyDataTable } =
    useSaleView();
  const columns = getSaleTableDefinition({
    onDeleteProduct: deleteDataTableRow,
  });
  const mutationCreate = useMutation({
    mutationFn: createSaleSaleService,
  });

  const storeProducts = async (): Promise<boolean> => {
    const dataSave = dataTable.map((dt) => ({
      _id: dt.product_id,
      quantity: dt.quantity,
    }));
    const result = await mutationCreate.mutateAsync({
      sale_id,
      products: dataSave,
    });
    if (result) {
      close();
      emptyDataTable();
    }
    return result !== null;
  };

  const onChangeSelect = (value: string | null) => {
    if (!value) return;

    const existsProduct = products?.find(
      (product) => product._id === value || product.barcode === value
    );
    if (!existsProduct) {
      notifications.show({
        title: "Error",
        message: "Este código de barras no existe",
      });
      return;
    }
    addProduct(existsProduct);
  };

  if (isFetching) {
    return (
      <>
        <Skeleton height={50} circle mb="xl" />
        <Skeleton height={8} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </>
    );
  }

  if (saleData === null) {
    return <>No se pudo cargar la venta, por favor vuelve atrás</>;
  }

  return (
    <>
      <PageTitle
        title={"Nueva venta"}
        subtitle={`Genera una nueva venta para ${saleData?.store.name} de ${currentCompany?.name}`}
        icon={<IconCash />}
      />
      <Divider m="lg" />

      <Group>
        <Card withBorder w={"350px"}>
          <Select
            searchable
            clearable
            limit={20}
            ref={refSelect}
            onChange={(e) => {
              onChangeSelect(e);
            }}
            value={null}
            hiddenInputProps={{
              value: undefined,
              autoFocus: false,
            }}
            placeholder="Selecciona el producto"
            data={(products || []).map((product) => {
              return {
                value: product._id || "",
                label: product.name + " - " + product.barcode,
              };
            })}
          />
        </Card>
        <BarcodeScanner onResult={onChangeSelect} />
        <OrderFormAdd sale_id={sale_id} />
      </Group>
      <Divider m="lg" />

      <TableComponent columns={columns} data={dataTable} />

      <Group>
        <div style={{ width: "300px" }}>
          <CardInfo
            value={getPriceFormat(
              dataTable.reduce((accumulator, dt) => {
                return dt.quantity * dt.price + accumulator;
              }, 0)
            )}
            subtitle={
              "iva: " +
              getPriceFormat(
                dataTable.reduce((accumulator, dt) => {
                  return dt.quantity * dt.price * (dt.iva / 100) + accumulator;
                }, 0)
              )
            }
            title={"Total"}
          />
        </div>

        <CardSummarySale dataTable={dataTable} storeProducts={storeProducts} />
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
