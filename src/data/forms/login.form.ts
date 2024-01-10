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

export const getSignupFormDefinition = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Ingrese un nuevo email",
      required: true,
    },
    {
      type: "text",
      name: "firstName",
      label: "Nombre(s)",
      placeholder: "Ingrese su(s) nombre(s)",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Apellido(s)",
      placeholder: "Ingrese su(s) apellido(s)",
      required: true,
    },
    {
      type: "check_password",
      name: "password",
      label: "Contraseña",
      placeholder: "Contraseña",
      required: true,
    },
  ];

  return fields;
};
