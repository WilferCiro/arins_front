import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getTableSearchFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "search",
      placeholder: "Ingrese un filtro",
      required: false,
    },
  ];

  return fields;
};
