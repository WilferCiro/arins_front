"use client";
import { Column } from "react-table";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import getFullDate from "@/domain/adapters/getFullDate";
import { getTotalSalesFromProducts, getTotalSalesIvaFromProducts } from "../utils/sales.utils";

export const getSalesOrderTableDefinition = (): Column<SaleSchema["orders"][0]>[] => {
  return [
    {
      Header: "Descripción",
      accessor: "description",
    },
    {
      Header: "Precio",
      accessor: "price",
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value)}</>;
      },
    },
    {
      Header: "Fecha",
      accessor: "date",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};

export const getSalesTableDefinition = (): Column<SaleSchema["sales"][0]>[] => {
  return [
    {
      Header: "Nro productos",
      Cell: ({ cell }) => {
        const quantity = cell.row.original.products.length;
        return <>{quantity}</>;
      },
    },
    {
      Header: "Total",
      Cell: ({ cell }) => {
        return <>{getPriceFormat(getTotalSalesFromProducts(cell.row.original.products))}</>;
      },
    },
    {
      Header: "Total iva",
      Cell: ({ cell }) => {
        return <>{getPriceFormat(getTotalSalesIvaFromProducts(cell.row.original.products))}</>;
      },
    },
    {
      Header: "Fecha",
      accessor: "date",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};

