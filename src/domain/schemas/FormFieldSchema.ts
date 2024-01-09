import React from "react";
import * as Yup from "yup";

interface FormFieldCommonSchema {
  name: string;
  label?: string;
  type:
    | "text"
    | "textarea"
    | "email"
    | "number"
    | "password"
    | "checkbox"
    | "date"
    | "daterange"
    | "datetime"
    | "select"
    | "select_search"
    | "multiselect"
    | "multiselect_search"
    | "file"
    | "check_password";
  initialValue?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  validate?: any;
}
export type FormFieldSchema =
  | (FormFieldCommonSchema & {
      type: "text" | "textarea" | "email" | "password" | "check_password" | "checkbox";
    })
  | (FormFieldCommonSchema & {
      type: "select" | "multiselect";
      service?: string;
      clearable?: boolean;
      options?: { value: string; label: string }[];
    })
  | (FormFieldCommonSchema & {
      type: "select_search" | "multiselect_search";
      endpoint: string;
    })
  | (FormFieldCommonSchema & {
      type: "number";
      min?: number;
      max?: number;
      decimals?: boolean;
      prefix?: string;
      suffix?: string;
      thousandSeparator?: string;
      allowNegative?: boolean;
    })
  | (FormFieldCommonSchema & {
      type: "date" | "datetime" | "daterange";
      showFuture?: boolean;
      clearable?: boolean;
    })
  | (FormFieldCommonSchema & {
      type: "file";
      accept?: string;
    });
