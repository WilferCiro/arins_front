import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

const getInitialValues = (fields: FormFieldSchema[]) => {
  const values = [];
  for (const field of fields) {
    const initialVal = [
      "multiselect_search",
      "multiselect",
      "daterange",
    ].includes(field.type)
      ? []
      : ["date"].includes(field.type)
      ? undefined
      : "";

    values.push([field.name, field.initialValue ?? initialVal]);
  }
  return Object.fromEntries(values);
};

const getValidations = (fields: FormFieldSchema[]) => {
  const values: { [key: string]: any } = {};
  fields.forEach((field: FormFieldSchema) => {
    if (field.validate) {
      values[field.name] = field.validate;
      return;
    }
    let validator: any;

    switch (field.type) {
      case "check_password":
      case "password":
      case "text":
        validator = Yup.string();
        break;
      case "number":
        validator = Yup.number().typeError(`${field.label} debe ser numérico`);
        if (field.min) {
          validator = validator.min(
            field.min,
            `${field.label} debe ser mayor o igual a ${field.min}`
          );
        }
        if (field.max) {
          validator = validator.max(
            field.max,
            `${field.label} debe ser menor o igual a ${field.min}`
          );
        }
        break;
      case "checkbox":
        validator = Yup.boolean();
        break;
      case "email":
        validator = Yup.string().email(
          `${field.label} debe ser un correo electrónico válido`
        );
        break;
      case "multiselect_search":
      case "multiselect":
        validator = Yup.array().of(Yup.string());
        break;
      case "daterange":
        validator = Yup.array().of(Yup.date());
        break;
      case "date":
        validator = Yup.date();
        break;
      default:
        validator = Yup.string();
        break;
    }
    if (field.required) {
      validator = validator.required(`${field.label} es un campo requerido`);
      if (field.type === "checkbox") {
        validator = validator.oneOf(
          [true],
          `${field.label} debe ser seleccionado.`
        );
      }
    } else {
      validator = validator.nullable();
    }
    values[field.name] = validator;
  });
  return Yup.object().shape(values);
};

export const useCustomForm = <T>(fields: FormFieldSchema[]) => {
  const form = useForm({
    defaultValues: getInitialValues(fields),
    resolver: yupResolver(getValidations(fields)),
    mode: "all",
    // validateInputOnChange: true,
  });

  return {
    form,
    initialValues: getInitialValues(fields),
  };
};
