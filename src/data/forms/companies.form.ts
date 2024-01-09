import { validateCopNit } from "@/domain/adapters/validateCopRut";
import { validatePhoneNumber } from "@/domain/adapters/validatePhoneNumber";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import * as Yup from "yup";

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
      validate: Yup.string()
        .required("El RUT es obligatorio")
        .test(
          "validateCopNit",
          "Ingrese un NIT colombiano válido (XXXXXXXXX-X)",
          validateCopNit
        ),
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
      validate: Yup.string()
        .test(
          "validatePhoneNumber",
          "Ingrese un número celular válido con extensión (+573XXXXXXXXX)",
          validatePhoneNumber
        ),
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
