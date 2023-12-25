import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getUsersFormAdd = (): FormFieldSchema[] => {
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
    {
      type: "text",
      name: "cellphone",
      label: "Celular",
      placeholder: "ej: +57 XXXXXXXX",
    },
    {
      type: "checkbox",
      name: "active",
      label: "¿Es activo?",
      initialValue: true,
    },
  ];

  return fields;
};

export const getUsersFormEdit = getUsersFormAdd;
