import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { appConfig } from "../config/app_config";
import { StoreSchema } from "@/domain/schemas/StoreSchema";

export const getSalesFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "number",
      name: "initialMoney",
      label: "Dinero inicial",
      placeholder: "Dinero inicial en la caja",
      required: true,
      prefix: "$ ",
      thousandSeparator: " ",
      allowNegative: false,
    },
    {
      type: "select_search",
      name: "store_id",
      label: "Bodega",
      placeholder: "Seleccione la bodega",
      endpoint: appConfig.API_BACKEND_URL + "/stores/select",
      required: true,
    },
  ];

  return fields;
};

interface PropsFilter {
  stores: StoreSchema[] | null;
}

export const getSalesFormFilter = ({
  stores,
}: PropsFilter): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "daterange",
      name: "createdAt",
      placeholder: "Filtrar por fecha",
      clearable: true,
    },
    {
      type: "select",
      name: "store_id",
      placeholder: "Seleccione la bodega",
      options: (stores || [])?.map((store) => ({
        label: store.name,
        value: store._id || "",
      })),
      initialValue: (stores || [])?.[0]?._id,
      required: true,
    },
  ];

  return fields;
};

export const getSalesOrderFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "number",
      name: "price",
      label: "Valor del pedido",
      placeholder: "Agrega el valor del pedido",
      required: true,
      prefix: "$ ",
      thousandSeparator: " ",
      allowNegative: false,
    },
    {
      type: "textarea",
      label: "Descripción",
      name: "description",
      placeholder: "Agrega una descripción del pedido",
    },
  ];

  return fields;
};
