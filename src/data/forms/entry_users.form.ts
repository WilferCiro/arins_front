import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getEntryUsersFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "firstName",
      label: "Nombres",
      placeholder: "Ingrese los nombres",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Apellidos",
      placeholder: "Ingrese los apellidos",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Correo electrónico",
      placeholder: "email@example.com",
      required: true,
    },
  ];

  return fields;
};
