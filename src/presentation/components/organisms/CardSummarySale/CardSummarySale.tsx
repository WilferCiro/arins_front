import { Button, Card, Flex, Modal, Text } from "@mantine/core";
import AsyncButton from "../../atoms/AsyncButton";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { useDisclosure } from "@mantine/hooks";
import { IconDatabase } from "@tabler/icons-react";
import { SaleTableSchema } from "@/domain/schemas/SaleIdSchema";
import CardInfo from "../../molecules/CardInfo";

interface Props {
  dataTable: SaleTableSchema[];
  storeProducts: () => Promise<boolean>;
}

const CardSummarySale = ({ dataTable, storeProducts }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  const onStoreProducts = async (): Promise<boolean> => {
    const valid = await storeProducts();
    if (valid) {
      close();
    }
    return valid;
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Resumen de la venta"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <CardInfo value={dataTable.length + ""} title={"Productos"} />
        <CardInfo
          value={getPriceFormat(
            dataTable.reduce((accumulator, dt) => {
              return dt.quantity * dt.price + accumulator;
            }, 0)
          )}
          title={"Total"}
        />
        <CardInfo
          value={getPriceFormat(
            dataTable.reduce((accumulator, dt) => {
              return dt.quantity * dt.price * (dt.iva / 100) + accumulator;
            }, 0)
          )}
          title={"Iva"}
        />
        <AsyncButton label="Guardar venta" onClick={onStoreProducts} />
      </Modal>

      <Button
        leftSection={<IconDatabase />}
        onClick={open}
        disabled={dataTable.length === 0}
      >
        Ver resumen
      </Button>
    </>
  );
};

export default CardSummarySale;
