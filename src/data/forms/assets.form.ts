import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { AssetsCategories } from "../constants/AssetsCategories";
import { appConfig } from "../config/app_config";
import { AssetAssessment } from "@/domain/enums/AssetAssessment";
import { AssetStatus } from "@/domain/enums/AssetStatus";

export const getAssetsFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
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
      placeholder: "Agregue el precio del activo",
      required: true,
      prefix: "$ ",
      thousandSeparator: " ",
      allowNegative: false
    },
    {
      type: "select",
      name: "category",
      label: "Categoría",
      placeholder: "Seleccione la categoría del activo",
      required: true,
      initialValue: AssetsCategories[0].value,
      options: AssetsCategories,
    },
    {
      type: "select_search",
      name: "dependency_id",
      label: "Dependencia",
      placeholder: "Seleccione la dependencia",
      endpoint: appConfig.API_BACKEND_URL + "/dependencies/select",
      required: true,
    },
    {
      type: "select",
      name: "status",
      label: "Estado",
      placeholder: "Seleccione la dependencia",
      required: true,
      initialValue: AssetStatus.Activo,
      options: (
        Object.keys(AssetStatus) as Array<keyof typeof AssetStatus>
      ).map((key) => ({
        label: AssetStatus[key],
        value: key,
      })),
    },
    {
      type: "select",
      name: "assessment",
      label: "Valoración",
      placeholder: "Seleccione la valoración",
      required: true,
      initialValue: AssetAssessment.Bueno,
      options: (
        Object.keys(AssetAssessment) as Array<keyof typeof AssetAssessment>
      ).map((key) => ({
        label: AssetAssessment[key],
        value: key,
      })),
    },
    {
      type: "text",
      name: "description",
      label: "descripción",
      placeholder: "Ingrese una breve descripción",
    },
    {
      type: "text",
      name: "plate",
      label: "Placa",
      placeholder: "Agregue si el activo tiene una placa",
    },
    {
      type: "text",
      name: "serial",
      label: "Serial",
      placeholder: "Agregue si el activo tiene un serial",
    },
    {
      type: "date",
      name: "acquisitionDate",
      label: "Fecha de adquisición",
      placeholder: "Seleccione la fecha de adquisición del activo",
      showFuture: false,
    },
  ];

  return fields;
};

export const getAssetsFormEdit = getAssetsFormAdd;

export const getAssetsFormFilter = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "search",
      placeholder: "Ingrese un filtro",
      required: false,
    },
    /*{
      type: "date",
      name: "acquisitionDate",
      placeholder: "Filtrar por fecha de adquisición",
      clearable: true,
      showFuture: false,
    },*/
    {
      type: "multiselect",
      name: "category",
      clearable: true,
      placeholder: "Filtrar por categoría",
      options: AssetsCategories,
    },
    {
      type: "multiselect_search",
      name: "dependency_id",
      placeholder: "Seleccione la dependencia",
      endpoint: appConfig.API_BACKEND_URL + "/dependencies/select",
    },
    {
      type: "multiselect",
      name: "status",
      clearable: true,
      placeholder: "Filtrar por estado",
      options: (
        Object.keys(AssetStatus) as Array<keyof typeof AssetStatus>
      ).map((key) => ({
        label: AssetStatus[key],
        value: key,
      })),
    },
    {
      type: "multiselect",
      name: "assessment",
      clearable: true,
      placeholder: "Filtar por valoración",
      options: (
        Object.keys(AssetAssessment) as Array<keyof typeof AssetAssessment>
      ).map((key) => ({
        label: AssetAssessment[key],
        value: key,
      })),
    },
  ];

  return fields;
};
