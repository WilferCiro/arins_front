import { Alert, Button, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FormModal from "../FormModal";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useMemo } from "react";
import { IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { read, utils } from "xlsx";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { ProductSchema } from "@/domain/schemas/ProductSchema";
import { addMassiveProductService } from "@/data/services/products.services";
import { getProductsMassiveForm } from "@/data/forms/products.form";

const ModalMassiveProducts = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const fieldsForm = useMemo(() => getProductsMassiveForm(), []);

  const { form } = useCustomForm(fieldsForm);

  const refreshTable = async () => {
    await queryClient.refetchQueries([`products_paginated`], {
      active: true,
    });
  };

  const mutation = useMutation({
    mutationFn: addMassiveProductService,
    onSuccess: (result: number | null) => {
      if (result) {
        refreshTable();
        notifications.show({
          color: "green",
          title: "Acción exitosa",
          message: `Se han agregado ${result} productos exitosamente`,
        });
      }
    },
  });

  const onAccept = async (): Promise<boolean> => {
    await form.trigger();
    const valid = form.formState.isValid;
    const values = form.getValues();
    if (valid) {
      const headers = {
        "Código de barras": "barcode",
        Nombre: "name",
        Precio: "price",
        Cantidad: "quantity",
        Iva: "iva",
        Presentación: "presentation",
        Descripción: "description",
      };
      const file = values.excel_file;
      const data = await file.arrayBuffer();
      const wb = read(data);
      const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
      const headerRow = utils.sheet_to_json(ws, { header: 1 })[0] as string[];
      const mappedHeaderRow = Object.keys(headers).map((key) =>
        headerRow.find((h) => h === key)
          ? headers[key as keyof typeof headers]
          : null
      );
      if (mappedHeaderRow.includes(null)) {
        notifications.show({
          color: "red",
          title: "Error al procesar el archivo excel",
          message: "No modifiques las cabeceras del archivo excel",
        });
        return false;
      }
      const dataExcel = utils.sheet_to_json(ws, {
        header: mappedHeaderRow as string[],
        range: "A3:G203",
      }) as ProductSchema[];
      const dataFinalExcel = dataExcel.map((dt) => ({
        ...dt,
        store_id: values.store_id,
      }));

      const final = await mutation.mutateAsync(dataFinalExcel);
      return !!final;
    }
    return true;
  };

  return (
    <>
      <FormModal
        opened={opened}
        onClose={close}
        onAccept={onAccept}
        fields={fieldsForm}
        form={form}
        title={"Agregar masivamente"}
        aditionalComponentTop={
          <>
            <Link
              href="/templates/xlsx/products.xlsx"
              download={"template_productos.xlsx"}
              target="_blank"
            >
              <Alert
                variant="light"
                color="blue"
                title="Descarga el excel de muestra"
                icon={<IconDownload />}
              />
            </Link>
            <Space h="lg" />
            Se aceptan máximo 200 registros en el excel
            <Space h="lg" />
          </>
        }
      />
      <Button onClick={open}>Agregar masivamente</Button>
    </>
  );
};

export default ModalMassiveProducts;
