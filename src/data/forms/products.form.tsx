import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { AssetsCategories } from "../constants/AssetsCategories";
import { appConfig } from "../config/app_config";
import { AssetAssessment } from "@/domain/enums/AssetAssessment";
import { AssetStatus } from "@/domain/enums/AssetStatus";
import { IconFileTypeXls } from "@tabler/icons-react";

export const getProductsFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "barcode",
      label: "Código de barras",
      placeholder: "Escanee el código de barras",
    },
    {
      type: "text",
      name: "name",
      label: "Nombre",
      placeholder: "Ingrese el nombre",
      required: true,
    },
    {
      type: "number",
      name: "price",
      label: "Precio",
      placeholder: "Ingrese el precio en COP sin puntos ni comas",
      required: true,
      prefix: "$ ",
      thousandSeparator: " ",
      allowNegative: false,
    },
    {
      type: "number",
      name: "quantity",
      label: "Cantidad",
      placeholder: "Ingrese la cantidad sin puntos ni comas",
      required: true,
      allowNegative: false,
    },
    {
      type: "number",
      name: "iva",
      label: "Iva",
      placeholder: "Ingrese el iva de 0-100",
      min: 0,
      max: 100,
      required: true,
      suffix: " %",
      allowNegative: false,
    },
    {
      type: "text",
      name: "presentation",
      label: "Presentación",
      placeholder: "Ingrese la presentación (ej: kg, l, gr, L)",
      required: true,
    },
    {
      type: "select_search",
      name: "store_id",
      label: "Bodega",
      placeholder: "Seleccione la bodega",
      endpoint: appConfig.API_BACKEND_URL + "/stores/select",
      required: true,
    },
    {
      type: "text",
      name: "description",
      label: "descripción",
      placeholder: "Ingrese una breve descripción",
    },
  ];

  return fields;
};

export const getProductsFormEdit = getProductsFormAdd;

export const getProductsFormFilter = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "search",
      placeholder: "Ingrese un filtro",
      required: false,
    },
    {
      type: "multiselect_search",
      name: "store_id",
      placeholder: "Seleccione la bodega",
      endpoint: appConfig.API_BACKEND_URL + "/stores/select",
    },
  ];

  return fields;
};

export const getProductsMassiveForm = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      label: "Bodega",
      type: "select_search",
      name: "store_id",
      placeholder: "Seleccione la bodega",
      endpoint: appConfig.API_BACKEND_URL + "/stores/select",
      required: true,
    },
    {
      type: "file",
      label: "Archivo Excel",
      name: "excel_file",
      placeholder: "Seleccione el archivo .xlsx",
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
      required: true,
      leftSection: <IconFileTypeXls />,
    },
  ];

  return fields;
};
