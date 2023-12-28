import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getReportsInventoryForm = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "select",
      name: "type",
      label: "Tipo de informe",
      placeholder: "Seleccione el tipo de informe",
      required: true,
      options: [
        {
          label: "Registro contable",
          value: "contable",
        },
        {
          label: "Artículos dados de baja",
          value: "bajas",
        },
      ],
    },
  ];

  return fields;
};
