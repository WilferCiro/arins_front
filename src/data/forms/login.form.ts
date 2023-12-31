import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getLoginFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
      initialValue: "admin@admin.com",
    },
    {
      type: "password",
      name: "password",
      label: "Contraseña",
      placeholder: "Contraseña",
      required: true,
      initialValue: "tB8.$X)}Z9",
    },
  ];

  return fields;
};
