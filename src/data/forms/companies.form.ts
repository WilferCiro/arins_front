import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

export const getCompaniesFormAdd = (): FormFieldSchema[] => {
  const fields: FormFieldSchema[] = [
    {
      type: "text",
      name: "name",
      label: "Nombre",
      placeholder: "Ingrese el nombre",
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
      name: "nit",
      label: "Nit",
      placeholder: "Ingrese el nit",
    },
    {
      type: "text",
      name: "address",
      label: "Dirección",
      placeholder: "Ingrese la dirección",
    },
    {
      type: "text",
      name: "cellphone",
      label: "Celular",
      placeholder: "ej: +57 XXXXXXXX",
    },
    {
      type: "text",
      name: "webpage",
      label: "Página web",
      placeholder: "ej: https://www.example.com",
    },
    {
      type: "select",
      name: "type",
      label: "Tipo de empresa",
      placeholder: "Seleccione el tipo de empresa",
      required: true,
      options: [
        {
          value: "Educación",
          label: "Educación",
        },
        {
          value: "Comercio",
          label: "Comercio",
        },
        {
          value: "Pública",
          label: "Pública",
        },
        {
          value: "Otra",
          label: "Otra",
        },
      ],
    },
  ];

  return fields;
};

export const getCompaniesFormEdit = getCompaniesFormAdd;
