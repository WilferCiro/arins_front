"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import { AssetSchema } from "@/domain/schemas/AssetSchema";

export const getAssetsTableDefinition = (): Column<AssetSchema>[] => {
  return [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Placa",
      accessor: "plate",
    },
    {
      Header: "Serial",
      accessor: "serial",
    },
    {
      Header: "Precio",
      accessor: "price",
    },
    {
      Header: "Categoría",
      accessor: "category",
    },
    {
      Header: "Dependencia",
      accessor: "dependency",
      Cell: ({ cell: { value } }) => {
        return <>{value?.name}</>;
      },
    },
    {
      Header: "Adquirida en",
      accessor: "acquisitionDate",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
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
