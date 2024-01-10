import { Card, List, PasswordInput, Progress, Space } from "@mantine/core";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import React from "react";

interface Props {
  onChange: (data: any) => void;
  value: any;
}

const PasswordCheckForm = React.forwardRef(
  ({ onChange, value, ...props }: Props, ref: any) => {
    const [values, setValues] = useState<
      [string | undefined, string | undefined]
    >([undefined, undefined]);

    const changeValue1 = (value1: ChangeEvent<HTMLInputElement>) => {
      const vals: [string | undefined, string | undefined] = [...values];
      vals[0] = value1.target.value;
      setValues(vals);
    };
    const changeValue2 = (value2: ChangeEvent<HTMLInputElement>) => {
      const vals: [string | undefined, string | undefined] = [...values];
      vals[1] = value2.target.value;
      setValues(vals);
    };

    const hasNumber = (value: string) => {
      return new RegExp(/[0-9]/).test(value);
    };
    const hasMixed = (value: string) => {
      return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
    };
    const hasSpecial = (value: string) => {
      return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
    };

    const hasLength = (value: string) => {
      return value.length > 8;
    };

    const areEqual = useCallback(() => {
      return values[0] && values[1] && values[0] === values[1];
    }, [values]);

    const validPercent = useCallback(
      (value: string) => {
        value = value || "";
        let newPercent = 0;
        newPercent += hasNumber(value) ? 1 : 0;
        newPercent += hasMixed(value) ? 1 : 0;
        newPercent += hasSpecial(value) ? 1 : 0;
        newPercent += hasLength(value) ? 1 : 0;
        newPercent += areEqual() ? 1 : 0;
        newPercent = (newPercent / 5) * 100;

        return newPercent;
      },
      [areEqual]
    );

    useEffect(() => {
      if (validPercent(values[0] || "") === 100) {
        onChange(values[0]);
      } else {
        onChange(undefined);
      }
    }, [onChange, validPercent, values]);

    return (
      <Card pos="relative" mt="md" p="0">
        <PasswordInput
          {...props}
          ref={ref}
          value={values[0]}
          placeholder="Ingrese la contraseña"
          onChange={changeValue1}
        />
        <PasswordInput
          {...props}
          label="Repita la contraseña"
          ref={ref}
          value={values[1]}
          placeholder="Repita la contraseña"
          onChange={changeValue2}
        />
        <Space mb="sm" />
        <Progress value={validPercent(values[0] || "")} />
        <List size="sm">
          <List.Item
            style={{ color: hasMixed(values[0] || "") ? "green" : "red" }}
          >
            Minúsculas y mayúsculas
          </List.Item>
          <List.Item
            style={{ color: hasNumber(values[0] || "") ? "green" : "red" }}
          >
            Número
          </List.Item>
          <List.Item
            style={{ color: hasSpecial(values[0] || "") ? "green" : "red" }}
          >
            Caracter especial
          </List.Item>
          <List.Item
            style={{ color: hasLength(values[0] || "") ? "green" : "red" }}
          >
            Más de 8 caracteres
          </List.Item>
          <List.Item style={{ color: areEqual() ? "green" : "red" }}>
            Coincidencia de contraseñas
          </List.Item>
        </List>
      </Card>
    );
  }
);

PasswordCheckForm.displayName = "PasswordCheckForm";

export default PasswordCheckForm;
