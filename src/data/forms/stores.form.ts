import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getStoresFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Nombre",
      placeholder: "Ingrese el nombre",
      required: true,
    },
    {
      type: "text",
      name: "code",
      label: "Código",
      placeholder: "Ingrese un código interno",
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

export const getStoresFormEdit = getStoresFormAdd;
