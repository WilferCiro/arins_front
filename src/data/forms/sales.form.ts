import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { appConfig } from "../config/app_config";

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
      allowNegative: false
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

export const getSalesFormFilter = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "daterange",
      name: "createdAt",
      placeholder: "Filtrar por fecha",
      clearable: true,
    },
    {
      type: "select_search",
      name: "store_id",
      placeholder: "Seleccione la bodega",
      endpoint: appConfig.API_BACKEND_URL + "/stores/select",
      required: true,
    },
  ];

  return fields;
};
