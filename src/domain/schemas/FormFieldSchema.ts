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
    | "multiselect_search";
  initialValue?: string | number | boolean;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validate?: Yup.NumberSchema<number | undefined, Yup.AnyObject, undefined, "">;
}
export type FormFieldSchema =
  | (FormFieldCommonSchema & {
      type: "text" | "textarea" | "email" | "password" | "checkbox";
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
    })
  | (FormFieldCommonSchema & {
      type: "date" | "datetime" | "daterange";
      showFuture?: boolean;
      clearable?: boolean;
    });
