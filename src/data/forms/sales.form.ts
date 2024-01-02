import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getSalesFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "number",
      name: "initialMoney",
      label: "Dinero inicial",
      placeholder: "Dinero inicial en la caja",
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
  ];

  return fields;
};
