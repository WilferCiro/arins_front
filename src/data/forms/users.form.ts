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
  ];

  return fields;
};

export const getUsersFormEdit = (): FormFieldSchema[] => {
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
      type: "text",
      name: "cellphone",
      label: "Celular",
      placeholder: "ej: +57 XXXXXXXX",
    },
  ];

  return fields;
};
export const getUsersFormEditPassword = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "password",
      name: "last_password",
      label: "Actual contraseña",
      placeholder: "Ingresa tu contraseña actual",
      required: true,
    },
    {
      type: "check_password",
      name: "password",
      label: "Nueva contraseña",
      placeholder: "Ingresa una nueva contraseña",
      required: true,
    },
  ];

  return fields;
};