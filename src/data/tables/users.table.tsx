"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { UserSchema } from "@/domain/schemas/UserSchema";

export const getUsersTableDefinition = (): Column<UserSchema>[] => {
  return [
    {
      Header: "Estado",
      accessor: "active",
      Cell: ({ cell: { value } }) => {
        return <BadgeActive active={value} />;
      },
    },
    {
      Header: "Nombres",
      accessor: "firstName",
    },
    {
      Header: "Apellidos",
      accessor: "lastName",
    },
    {
      Header: "Celular",
      accessor: "cellphone",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Creado",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
    {
      Header: "Actualizado",
      accessor: "updatedAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};
