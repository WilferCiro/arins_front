"use client";
import { Column } from "react-table";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { SaleTableSchema } from "@/domain/schemas/SaleIdSchema";
import { ActionIcon, NumberInput } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export const getSaleTableDefinition = (): Column<SaleTableSchema>[] => {
  return [
    {
      Header: "Producto",
      accessor: "product",
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
      Cell: ({ cell: { value } }) => {
        return <NumberInput value={value} w="100px" />;
      },
    },
    {
      Header: "Total",
      Cell: ({ cell }) => {
        return (
          <>
            {getPriceFormat(
              cell.row.original.quantity * cell.row.original.price
            )}
          </>
        );
      },
    },
    {
      Header: "Acciones",
      Cell: ({ cell: { value } }) => {
        return (
          <ActionIcon variant="filled" aria-label="Settings" color="red">
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        );
      },
    },
  ];
};
