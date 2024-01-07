"use client";

import {
  Checkbox,
  FileInput,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Select,
  TextInput,
  Textarea,
} from "@mantine/core";
import { Controller } from "react-hook-form";
import { FormFieldSchema } from "@/domain/schemas/FormFieldSchema";
import { FormType } from "@/domain/types/FormType";
import SelectSearchForm from "../../molecules/SelectSearchForm";
import { DatePickerInput, DateValue, DatesRangeValue } from "@mantine/dates";
import dayjs from "dayjs";
import MultiSelectSearchForm from "../../molecules/MultiSelectSearchForm";

const formatDate = (date: DateValue | undefined): DateValue | undefined => {
  if (typeof date === "string" && date !== "") {
    return dayjs(date).toDate();
  }
  if (date === null) {
    return undefined;
  }
  return date;
};

const formatStringArray = (value: string | string[]) => {
  if (typeof value === "string") {
    return value !== "" ? [value] : [];
  }
  return value || [];
};

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
      leftSection: formField.leftSection ?? undefined,
      rightSection: formField.rightSection ?? undefined,
    };
    switch (formField.type) {
      case "email":
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
              <NumberInput
                {...field}
                {...props}
                suffix={formField?.suffix}
                prefix={formField?.prefix}
                thousandSeparator={formField?.thousandSeparator}
                allowNegative={formField?.allowNegative}
                onChange={field.onChange}
              />
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
                  clearable={formField.clearable || false}
                  data={formField.options || []}
                  value={(field.value?._id || field.value) + ""}
                  searchable
                />
              );
            }}
          />
        );
      case "select_search":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => {
              return (
                <SelectSearchForm
                  {...props}
                  {...field}
                  ref={field.ref}
                  endpoint={formField.endpoint}
                  value={(field.value?.id || field.value) + ""}
                />
              );
            }}
          />
        );
      case "multiselect":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => {
              return (
                <MultiSelect
                  {...field}
                  {...props}
                  clearable={formField.clearable || false}
                  data={formField.options || []}
                  value={formatStringArray(field.value)}
                  onChange={(value) => field.onChange(formatStringArray(value))}
                  searchable
                />
              );
            }}
          />
        );
      case "multiselect_search":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => {
              return (
                <MultiSelectSearchForm
                  {...props}
                  {...field}
                  ref={field.ref}
                  endpoint={formField.endpoint}
                  value={formatStringArray(field.value)}
                  onChange={(value) => field.onChange(formatStringArray(value))}
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
      case "daterange":
      case "date":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => {
              return (
                <>
                  <DatePickerInput
                    valueFormat="DD - MMM - YYYY"
                    type={formField.type === "daterange" ? "range" : "default"}
                    {...field}
                    {...props}
                    locale="es"
                    value={
                      Array.isArray(field.value)
                        ? (field.value.map((date) =>
                            dayjs(date).toDate()
                          ) as DatesRangeValue)
                        : dayjs(field.value).toDate()
                    }
                    clearable={formField.clearable}
                    onChange={(value: DateValue | DatesRangeValue | null) => {
                      field.onChange(value ? value : undefined);
                    }}
                    maxDate={formField.showFuture ? undefined : new Date()}
                  />
                </>
              );
            }}
          />
        );
      case "file":
        return (
          <Controller
            name={formField.name}
            control={form.control}
            key={formField.name}
            render={({ field }) => {
              return (
                <FileInput
                  {...field}
                  {...props}
                  accept={formField.accept}
                  leftSectionPointerEvents="none"
                  clearable={true}
                />
              );
            }}
          />
        );
    }
  });

  return <>{formFieldsFormat}</>;
};

export default GenericForm;
