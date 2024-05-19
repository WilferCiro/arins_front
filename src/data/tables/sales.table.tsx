import getFullDate from "@/domain/adapters/getFullDate";
import { Column } from "react-table";
import BadgeActive from "@/presentation/components/atoms/BadgeActive/BadgeActive";
import { SaleSchema, SaleSimpleSchema } from "@/domain/schemas/SaleSchema";
import { getPriceFormat } from "@/domain/adapters/getPriceFormat";
import { chechCurrentDate } from "@/domain/adapters/checkCurrentDate";
import AsyncButton from "@/presentation/components/atoms/AsyncButton";
import FormSaleResume from "@/presentation/components/organisms/FormSaleResume";


interface Props {
  onExportRow: (_id: string) => Promise<boolean>;
}

export const getSalesTableDefinition = ({
  onExportRow,
}: Props): Column<SaleSimpleSchema>[] => {
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
        return <>{getPriceFormat(original.sales.total)}</>;
      },
    },
    {
      Header: "Total pedidos",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{getPriceFormat(original.orders.total)}</>;
      },
    },
    {
      Header: "Dinero final",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return (
          <>
            {getPriceFormat(
              original.finalMoney
            )}
          </>
        );
      },
    },
    {
      Header: "Iva ventas",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{getPriceFormat(original.sales.iva)}</>;
      },
    },
    {
      Header: "Nro. Ventas",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{original.sales.total}</>;
      },
    },
    {
      Header: "Nro. Pedidos",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return <>{original.orders.total}</>;
      },
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
      Header: "Acciones",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return (
          <>
            {original._id === undefined ? (
              <></>
            ) : (
              <AsyncButton
                label={"Exportar"}
                onClick={() => onExportRow(original._id || "")}
              />
            )}
          </>
        );
      },
    },
    {
      Header: "Resumen",
      Cell: ({ cell }) => {
        const original = cell.row.original;
        return (
          <>
            {original._id === undefined ? (
              <></>
            ) : (
              <FormSaleResume saleId={original._id} />
            )}
          </>
        );
      },
    },


  ];
};
