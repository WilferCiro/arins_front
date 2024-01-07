"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import { AssetSchema } from "@/domain/schemas/AssetSchema";
import getDateTimeString from "@/domain/adapters/getDateTimeString";
import getSimpleDate from "@/domain/adapters/getSimpleDate";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";

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
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value)}</>;
      },
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
      Header: "Valoración",
      accessor: "assessment",
    },
    {
      Header: "Estado",
      accessor: "status",
    },
    {
      Header: "Adquirida en",
      accessor: "acquisitionDate",
      Cell: ({ cell: { value } }) => {
        return <>{getSimpleDate(value)}</>;
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
