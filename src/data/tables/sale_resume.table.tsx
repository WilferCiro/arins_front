"use client";
import { Column } from "react-table";
import { SaleSchema } from "@/domain/schemas/SaleSchema";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import getFullDate from "@/domain/adapters/getFullDate";
import { getTotalSalesFromProducts, getTotalSalesIvaFromProducts } from "../utils/sales.utils";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import { IconDownload } from "@tabler/icons-react";

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

interface Props {
  downloadInvoice: (_id: string) => Promise<void | boolean>;
}


export const getSalesTableResumeDefinition = ({ downloadInvoice }: Props): Column<SaleSchema["sales"][0]>[] => {
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
    {
      Header: "Factura",
      Cell: ({ cell }) => {
        const sale_id = cell.row.original._id;
        return (
          <>
            <AsyncButton label="Download" showError={true} leftIcon={<IconDownload />} onClick={async () => await downloadInvoice(sale_id)} />
          </>
        );
      },
    },
  ];
};

