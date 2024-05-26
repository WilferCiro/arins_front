import { useDisclosure } from "@mantine/hooks";
import FormModal from "../FormModal";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { getSalesOrderFormAdd } from "@/data/forms/sales.form";
import { useMemo } from "react";
import { SaleOrderAddSchema } from "@/domain/schemas/SaleSchema";
import { Button } from "@mantine/core";
import { addSaleOrderService } from "@/data/services/sales.services";

interface Props {
    sale_id: string;
}

const OrderFormAdd = ({sale_id}: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const formAdd = useMemo(() => getSalesOrderFormAdd(), []);
  const { form } = useCustomForm<SaleOrderAddSchema>(formAdd);

  const onAdd = async (): Promise<boolean> => {
    await form.trigger();
    const valid = form.formState.isValid;
    if (!valid) {
      return false;
    }
    const data = {
        ...form.getValues(),
        sale_id
    }
    const result = await addSaleOrderService(
        data
    );

    return result !== null;
  };
  return (
    <>
      <FormModal
        opened={opened}
        onClose={close}
        onAccept={onAdd}
        fields={formAdd}
        form={form}
        title={"Crear registro"}
      />
      <Button onClick={open}>Agregar pedido</Button>
    </>
  );
};

export default OrderFormAdd;
