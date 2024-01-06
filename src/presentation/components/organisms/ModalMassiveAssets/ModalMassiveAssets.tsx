import { Alert, Button, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import FormModal from "../FormModal";
import { useCustomForm } from "@/presentation/hooks/useCustomForm";
import { useMemo } from "react";
import { getAssetsMassiveForm } from "@/data/forms/assets.form";
import { IconDownload } from "@tabler/icons-react";
import Link from "next/link";
import { read, utils } from "xlsx";
import { notifications } from "@mantine/notifications";
import { AssetSchema } from "@/domain/schemas/AssetSchema";
import { useMutation, useQueryClient } from "react-query";
import { addMassiveAssetService } from "@/data/services/assets.services";

const ModalMassiveAssets = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const fieldsForm = useMemo(() => getAssetsMassiveForm(), []);

  const { form } = useCustomForm(fieldsForm);

  const refreshTable = async () => {
    await queryClient.refetchQueries([`assets_paginated`], {
      active: true,
    });
  };

  const mutation = useMutation({
    mutationFn: addMassiveAssetService,
    onSuccess: (result: number | null) => {
      if (result) {
        refreshTable();
        notifications.show({
          color: "green",
          title: "Acción exitosa",
          message: `Se han agregado ${result} activos exitosamente`,
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
        Nombre: "name",
        Precio: "price",
        Categoría: "category",
        Estado: "status",
        Valoración: "assessment",
        Descripción: "description",
        Placa: "plate",
        Serial: "serial",
        "Fecha de adquisición": "acquisitionDate",
      };
      const file = values.excel_file;
      const data = await file.arrayBuffer();
      const wb = read(data, { dateNF: "yyyy-mm-dd", cellDates: true });
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
        range: "A3:I203",
      }) as AssetSchema[];
      const dataFinalExcel = dataExcel.map((dt) => ({
        ...dt,
        dependency_id: values.dependency_id,
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
          <Link
            href="/templates/xlsx/assets.xlsx"
            download={"template_assets.xlsx"}
            target="_blank"
          >
            <Alert
              variant="light"
              color="blue"
              title="Descarga el excel de muestra"
              icon={<IconDownload />}
            />
            <Space h="lg" />
          </Link>
        }
      />
      <Button onClick={open}>Agregar masivamente</Button>
    </>
  );
};

export default ModalMassiveAssets;
