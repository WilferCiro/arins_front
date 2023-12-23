"use client";

import {
  Checkbox,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { FormType } from "@/domain/types/FormType";

interface Props {
  form: FormType;
  fields: FormFieldSchema[];
}

const GenericForm = ({ form, fields }: Props) => {
  const formFieldsFormat = (fields || []).map((formField: FormFieldSchema) => {
    const props = {
      name: formField.name,
      withAsterisk: formField?.required ?? false,
      label: formField.label,
      placeholder: formField.placeholder || formField.label,
      autoComplete: "false",
      errorProps: { size: "xs" },
      error: form.formState?.errors[formField.name]?.message,
      disabled: formField.disabled ?? false,
    };
    switch (formField.type) {
      case "email":
      case "ethereum":
      case "ipfs":
      case "text":
        return (
          <TextInput
            key={formField.name}
            {...props}
            {...form.register(formField.name)}
          />
        );
      case "password":
        return (
          <PasswordInput
            key={formField.name}
            {...props}
            {...form.register(formField.name)}
          />
        );
      case "number":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => (
              <NumberInput {...field} {...props} onChange={field.onChange} />
            )}
          />
        );
      case "textarea":
        return (
          <Textarea
            key={formField.name}
            {...props}
            {...form.register(formField.name)}
          />
        );
      case "select":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => {
              return (
                <Select
                  {...field}
                  {...props}
                  data={formField.options || []}
                  value={(field.value?.id || field.value) + ""}
                />
              );
            }}
          />
        );
      case "checkbox":
        const propsCheck = {
          ...props,
          withAsterisk: undefined,
          errorProps: undefined,
        };
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => (
              <Checkbox
                {...field}
                {...propsCheck}
                style={{ marginTop: "10px" }}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        );
    }
  });

  return <>{formFieldsFormat}</>;
};

export default GenericForm;
