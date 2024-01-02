"use client";
import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { chechCurrentDate } from "@/domain/adapters/checkCurrentDate";

const getTotalSales = (sale: SaleSchema) => {
  const prods = sale.sales.flatMap((s) => s.products);
  return prods.reduce((accumulator, dt) => {
    return dt.quantity * dt.price + accumulator;
  }, 0);
};
const getTotalOrders = (sale: SaleSchema) => {
  return sale.orders.reduce((accumulator, dt) => {
    return dt.price + accumulator;
  }, 0);
};

export const getSalesTableDefinition = (): Column<SaleSchema>[] => {
  return [
    {
      Header: "Estado",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return (
          <BadgeActive
            active={chechCurrentDate(new Date(original.createdAt))}
          />
        );
      },
    },
    {
      Header: "Dinero inicial",
      accessor: "initialMoney",
      Cell: ({ cell: { value } }) => {
        return <>{getPriceFormat(value)}</>;
      },
    },
    {
      Header: "Total ventas",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{getPriceFormat(getTotalSales(original))}</>;
      },
    },
    {
      Header: "Total pedidos",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{getPriceFormat(getTotalOrders(original))}</>;
      },
    },
    {
      Header: "Dinero final",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return (
          <>
            {getPriceFormat(
              original.initialMoney +
                getTotalSales(original) -
                getTotalOrders(original)
            )}
          </>
        );
      },
    },
    {
      Header: "Nro. Ventas",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{original.sales.length}</>;
      },
    },
    {
      Header: "Nro. Pedidos",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{original.orders.length}</>;
      },
    },
    {
      Header: "Creada",
      accessor: "createdAt",
      Cell: ({ cell: { value } }) => {
        return <>{getFullDate(value)}</>;
      },
    },
  ];
};
