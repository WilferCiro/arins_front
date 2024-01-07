import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { IconGlass, IconSearch } from "@tabler/icons-react";

export const getTableSearchFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "search",
      placeholder: "Ingrese un filtro",
      required: false,
      rightSection: <IconSearch />,
    },
  ];

  return fields;
};
