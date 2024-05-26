"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { EntryUserSchema } from "@/domain/schemas/EntryUserSchema";

export const getEntryUsersTableDefinition = (): Column<EntryUserSchema>[] => {
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
