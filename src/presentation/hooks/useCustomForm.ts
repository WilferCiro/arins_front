import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";

const getInitialValues = (fields: FormFieldSchema[]) => {
  const values = [];
  for (const field of fields) {
    values.push([field.name, field.initialValue ?? ""]);
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
    let validator:
      | Yup.StringSchema<any>
      | Yup.NumberSchema<any>
      | Yup.BooleanSchema<any>;

    switch (field.type) {
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
  };
};
