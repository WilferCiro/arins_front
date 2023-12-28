"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { ProductSchema } from "@/domain/schemas/ProductSchema";

export const getProductsTableDefinition = (): Column<ProductSchema>[] => {
  return [
    {
      Header: "Nombre",
      accessor: "name",
    },
    {
      Header: "Barras",
      accessor: "barcode",
    },
    {
      Header: "Precio",
      accessor: "price",
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value)}</>;
      },
    },
    {
      Header: "Cantidad",
      accessor: "quantity",
    },
    {
      Header: "Presentación",
      accessor: "presentation",
    },
    {
      Header: "Bodega",
      accessor: "store",
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
