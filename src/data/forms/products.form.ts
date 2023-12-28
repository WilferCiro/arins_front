import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { AssetsCategories } from "../constants/AssetsCategories";
import { appConfig } from "../config/app_config";
import { AssetAssessment } from "@/domain/enums/AssetAssessment";
import { AssetStatus } from "@/domain/enums/AssetStatus";

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
    },
    {
      type: "number",
      name: "quantity",
      label: "Cantidad",
      placeholder: "Ingrese la cantidad sin puntos ni comas",
      required: true,
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
      type: "select_search",
      name: "store_id",
      placeholder: "Seleccione la bodega",
      endpoint: appConfig.API_BACKEND_URL + "/stores/select",
    },
  ];

  return fields;
};
