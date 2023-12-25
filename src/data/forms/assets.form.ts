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
      name: "assement",
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
    },
  ];

  return fields;
};

export const getAssetsFormEdit = getAssetsFormAdd;
