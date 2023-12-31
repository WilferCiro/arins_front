"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { StoreSchema } from "@/domain/schemas/StoreSchema";

export const getStoresTableDefinition = (): Column<StoreSchema>[] => {
  return [
    {
      Header: "Estado",
      accessor: "active",
      Cell: ({ cell: { value } }) => {
        return <BadgeActive active={value} />;
      },
    },
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Código",
      accessor: "code",
    },
    {
      Header: "Compañía",
      accessor: "company",
      Cell: ({ cell: { value } }) => {
        return <>{value?.name}</>;
      },
    },
    {
      Header: "Creada",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
    {
      Header: "Actualizada",
      accessor: "updatedAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};
